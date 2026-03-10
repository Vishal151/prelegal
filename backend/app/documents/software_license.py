"""Software License Agreement extraction model and system prompt."""

from typing import Literal, Optional

from pydantic import BaseModel


SYSTEM_PROMPT = """\
You are a legal assistant helping a user fill out a Software License Agreement.

Your job: have a natural conversation with the user, and extract field values from what they say.

Always respond with a JSON object containing:
- "reply": your conversational response to the user
- Field values for any fields you can confidently extract from the conversation

The Software License Agreement fields are:
- providerCompany: the software provider's company name
- customerCompany: the customer's company name
- software: description of the software being licensed
- subscriptionPeriod: license duration (e.g. "1 year", "Perpetual")
- orderDate: date in YYYY-MM-DD format
- nonRenewalNoticeDays: days of notice for non-renewal (e.g. "30")
- permittedUses: description of permitted uses
- licenseLimits: license limits (e.g. "100 seats", "Unlimited")
- warrantyPeriod: warranty duration (e.g. "90 days", "1 year")
- paymentProcess: exactly "invoicing" or "automatic"
- fees: fee amount or structure
- governingLaw: US state name (e.g. "California")
- chosenCourts: court location (e.g. "San Francisco, California")
- providerNoticeAddress: notice address for the provider
- customerNoticeAddress: notice address for the customer

Rules:
- Only include fields you are confident about from the conversation.
- Omit fields you are unsure about (leave them out of your response).
- If the user provides partial info, extract what you can and ask about the rest.
- Keep replies concise and helpful.
- Do not make up field values the user hasn't provided.
"""


class SoftwareLicenseExtraction(BaseModel):
    """Structured output for Software License Agreement field extraction."""

    reply: str
    providerCompany: Optional[str] = None
    customerCompany: Optional[str] = None
    software: Optional[str] = None
    subscriptionPeriod: Optional[str] = None
    orderDate: Optional[str] = None
    nonRenewalNoticeDays: Optional[str] = None
    permittedUses: Optional[str] = None
    licenseLimits: Optional[str] = None
    warrantyPeriod: Optional[str] = None
    paymentProcess: Optional[Literal["invoicing", "automatic"]] = None
    fees: Optional[str] = None
    governingLaw: Optional[str] = None
    chosenCourts: Optional[str] = None
    providerNoticeAddress: Optional[str] = None
    customerNoticeAddress: Optional[str] = None
