export type DocType =
  | "nda"
  | "csa"
  | "sla"
  | "design-partner"
  | "psa"
  | "dpa"
  | "partnership"
  | "software-license"
  | "pilot"
  | "baa"
  | "ai-addendum";

export interface CatalogEntry {
  docType: DocType;
  name: string;
  description: string;
  route: string;
}

export const CATALOG: CatalogEntry[] = [
  {
    docType: "nda",
    name: "Mutual Non-Disclosure Agreement",
    description: "A standard mutual NDA for sharing confidential information when evaluating a business relationship.",
    route: "/nda",
  },
  {
    docType: "csa",
    name: "Cloud Service Agreement",
    description: "A standard agreement for selling and buying cloud software and SaaS products.",
    route: "/csa",
  },
  {
    docType: "sla",
    name: "Service Level Agreement",
    description: "A standard SLA to be used alongside the Cloud Service Agreement.",
    route: "/sla",
  },
  {
    docType: "design-partner",
    name: "Design Partner Agreement",
    description: "An agreement for early product access where a partner tests and provides feedback.",
    route: "/design-partner",
  },
  {
    docType: "psa",
    name: "Professional Services Agreement",
    description: "A standard agreement for professional and consulting services engagements.",
    route: "/psa",
  },
  {
    docType: "dpa",
    name: "Data Processing Agreement",
    description: "A GDPR-compliant DPA for when a provider processes personal data on behalf of a customer.",
    route: "/dpa",
  },
  {
    docType: "partnership",
    name: "Partnership Agreement",
    description: "A standard agreement for business partnerships between two companies.",
    route: "/partnership",
  },
  {
    docType: "software-license",
    name: "Software License Agreement",
    description: "A standard agreement for licensing on-premise or downloadable software.",
    route: "/software-license",
  },
  {
    docType: "pilot",
    name: "Pilot Agreement",
    description: "A short-term agreement allowing a prospective customer to trial a product or service.",
    route: "/pilot",
  },
  {
    docType: "baa",
    name: "Business Associate Agreement",
    description: "A HIPAA-compliant BAA for handling protected health information.",
    route: "/baa",
  },
  {
    docType: "ai-addendum",
    name: "AI Addendum",
    description: "An addendum for agreements involving AI-powered products or services.",
    route: "/ai-addendum",
  },
];

export function getCatalogEntry(docType: DocType): CatalogEntry | undefined {
  return CATALOG.find((c) => c.docType === docType);
}
