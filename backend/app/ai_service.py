"""AI service for NDA field extraction via LiteLLM + Cerebras."""

from typing import Literal, Optional

from litellm import completion
from pydantic import BaseModel

# Ensure load_dotenv has run so OPENROUTER_API_KEY is in os.environ for LiteLLM
import app.config  # noqa: F401

MODEL = "openrouter/openai/gpt-oss-120b"
EXTRA_BODY = {"provider": {"order": ["cerebras"]}}

SYSTEM_PROMPT = """\
You are a legal assistant helping a user fill out a Mutual Non-Disclosure Agreement.

Your job: have a natural conversation with the user, and extract NDA field values from what they say.

Always respond with a JSON object containing:
- "reply": your conversational response to the user
- Field values for any NDA fields you can confidently extract from the conversation

The NDA fields are:
- purpose: the purpose of sharing confidential information (default: "Evaluating whether to enter into a business relationship with the other party.")
- effectiveDate: date in YYYY-MM-DD format
- mndaTerm: exactly "1year" or "indefinite"
- termOfConfidentiality: exactly "1year" or "perpetual"
- governingLaw: US state name (e.g. "California")
- jurisdiction: court location (e.g. "San Francisco, California")
- party1Company: company name for Party 1
- party1Name: printed name for Party 1 signatory
- party1Title: title for Party 1 signatory
- party1Address: notice address (email or postal) for Party 1
- party1Date: signing date for Party 1 in YYYY-MM-DD format
- party2Company: company name for Party 2
- party2Name: printed name for Party 2 signatory
- party2Title: title for Party 2 signatory
- party2Address: notice address (email or postal) for Party 2
- party2Date: signing date for Party 2 in YYYY-MM-DD format

Rules:
- Only include fields you are confident about from the conversation.
- Omit fields you are unsure about (leave them out of your response).
- If the user provides partial info, extract what you can and ask about the rest.
- Keep replies concise and helpful.
- Do not make up field values the user hasn't provided.
"""


class NdaExtraction(BaseModel):
    """Structured output: reply text + any extracted NDA fields."""

    reply: str
    purpose: Optional[str] = None
    effectiveDate: Optional[str] = None
    mndaTerm: Optional[Literal["1year", "indefinite"]] = None
    termOfConfidentiality: Optional[Literal["1year", "perpetual"]] = None
    governingLaw: Optional[str] = None
    jurisdiction: Optional[str] = None
    party1Company: Optional[str] = None
    party1Name: Optional[str] = None
    party1Title: Optional[str] = None
    party1Address: Optional[str] = None
    party1Date: Optional[str] = None
    party2Company: Optional[str] = None
    party2Name: Optional[str] = None
    party2Title: Optional[str] = None
    party2Address: Optional[str] = None
    party2Date: Optional[str] = None


# Fields to extract from the structured output (everything except "reply")
_NDA_FIELD_NAMES = [f for f in NdaExtraction.model_fields if f != "reply"]


def extract_nda_fields(messages: list[dict]) -> NdaExtraction:
    """Call LLM with conversation history and return structured extraction."""
    full_messages = [{"role": "system", "content": SYSTEM_PROMPT}, *messages]
    response = completion(
        model=MODEL,
        messages=full_messages,
        response_format=NdaExtraction,
        reasoning_effort="low",
        extra_body=EXTRA_BODY,
    )
    raw = response.choices[0].message.content
    return NdaExtraction.model_validate_json(raw)


def extraction_to_field_dict(extraction: NdaExtraction) -> dict:
    """Return only the non-None NDA fields (excludes reply)."""
    return {
        k: v
        for k in _NDA_FIELD_NAMES
        if (v := getattr(extraction, k)) is not None
    }
