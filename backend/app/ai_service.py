"""Generic AI extraction service using LiteLLM + Cerebras."""

from litellm import completion
from pydantic import BaseModel

# Ensure load_dotenv has run so OPENROUTER_API_KEY is in os.environ for LiteLLM
import app.config  # noqa: F401

MODEL = "openrouter/openai/gpt-oss-120b"
EXTRA_BODY = {"provider": {"order": ["cerebras"]}}


def extract_fields(
    system_prompt: str,
    extraction_model: type[BaseModel],
    messages: list[dict],
) -> BaseModel:
    """Call LLM with conversation history and return structured extraction."""
    full_messages = [{"role": "system", "content": system_prompt}, *messages]
    response = completion(
        model=MODEL,
        messages=full_messages,
        response_format=extraction_model,
        reasoning_effort="low",
        extra_body=EXTRA_BODY,
    )
    raw = response.choices[0].message.content
    return extraction_model.model_validate_json(raw)


def extraction_to_field_dict(extraction: BaseModel) -> dict:
    """Return only the non-None fields (excludes reply)."""
    return {
        k: v
        for k, v in extraction.model_dump().items()
        if k != "reply" and v is not None
    }
