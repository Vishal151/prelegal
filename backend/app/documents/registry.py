"""Document type registry mapping slugs to extraction models and prompts."""

from dataclasses import dataclass

from pydantic import BaseModel


@dataclass
class DocDefinition:
    """Everything needed to run extraction for a document type."""
    doc_type: str
    display_name: str
    extraction_model: type[BaseModel]
    system_prompt: str


def _build_registry() -> dict[str, DocDefinition]:
    """Build the registry by importing all document modules."""
    from app.documents import nda, csa, sla, design_partner, psa, dpa
    from app.documents import partnership, software_license, pilot, baa, ai_addendum

    return {
        "nda": DocDefinition("nda", "Mutual Non-Disclosure Agreement", nda.NdaExtraction, nda.SYSTEM_PROMPT),
        "csa": DocDefinition("csa", "Cloud Service Agreement", csa.CsaExtraction, csa.SYSTEM_PROMPT),
        "sla": DocDefinition("sla", "Service Level Agreement", sla.SlaExtraction, sla.SYSTEM_PROMPT),
        "design-partner": DocDefinition("design-partner", "Design Partner Agreement", design_partner.DesignPartnerExtraction, design_partner.SYSTEM_PROMPT),
        "psa": DocDefinition("psa", "Professional Services Agreement", psa.PsaExtraction, psa.SYSTEM_PROMPT),
        "dpa": DocDefinition("dpa", "Data Processing Agreement", dpa.DpaExtraction, dpa.SYSTEM_PROMPT),
        "partnership": DocDefinition("partnership", "Partnership Agreement", partnership.PartnershipExtraction, partnership.SYSTEM_PROMPT),
        "software-license": DocDefinition("software-license", "Software License Agreement", software_license.SoftwareLicenseExtraction, software_license.SYSTEM_PROMPT),
        "pilot": DocDefinition("pilot", "Pilot Agreement", pilot.PilotExtraction, pilot.SYSTEM_PROMPT),
        "baa": DocDefinition("baa", "Business Associate Agreement", baa.BaaExtraction, baa.SYSTEM_PROMPT),
        "ai-addendum": DocDefinition("ai-addendum", "AI Addendum", ai_addendum.AiAddendumExtraction, ai_addendum.SYSTEM_PROMPT),
    }


_registry: dict[str, DocDefinition] | None = None


def get_registry() -> dict[str, DocDefinition]:
    """Lazy-load the registry on first access."""
    global _registry
    if _registry is None:
        _registry = _build_registry()
    return _registry
