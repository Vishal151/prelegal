export interface BaaFormData {
  providerCompany: string;
  companyName: string;
  effectiveDate: string;
  servicesDescription: string;
  breachNotificationDays: string;
  offshoringAllowed: "allowed" | "restricted";
  deidentificationAllowed: "allowed" | "restricted";
  aggregationAllowed: "allowed" | "restricted";
  providerNoticeAddress: string;
  companyNoticeAddress: string;
}

export const defaultFormData: BaaFormData = {
  providerCompany: "",
  companyName: "",
  effectiveDate: "",
  servicesDescription: "",
  breachNotificationDays: "60",
  offshoringAllowed: "restricted",
  deidentificationAllowed: "restricted",
  aggregationAllowed: "restricted",
  providerNoticeAddress: "",
  companyNoticeAddress: "",
};

export const OFFSHORING_LABELS: Record<BaaFormData["offshoringAllowed"], string> = {
  allowed: "Allowed",
  restricted: "Restricted",
};

export const DEIDENTIFICATION_LABELS: Record<BaaFormData["deidentificationAllowed"], string> = {
  allowed: "Allowed",
  restricted: "Restricted",
};

export const AGGREGATION_LABELS: Record<BaaFormData["aggregationAllowed"], string> = {
  allowed: "Allowed",
  restricted: "Restricted",
};
