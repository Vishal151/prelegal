export interface SoftwareLicenseFormData {
  providerCompany: string;
  customerCompany: string;
  software: string;
  subscriptionPeriod: string;
  orderDate: string;
  nonRenewalNoticeDays: string;
  permittedUses: string;
  licenseLimits: string;
  warrantyPeriod: string;
  paymentProcess: "invoicing" | "automatic";
  fees: string;
  governingLaw: string;
  chosenCourts: string;
  providerNoticeAddress: string;
  customerNoticeAddress: string;
}

export const defaultFormData: SoftwareLicenseFormData = {
  providerCompany: "",
  customerCompany: "",
  software: "",
  subscriptionPeriod: "",
  orderDate: "",
  nonRenewalNoticeDays: "",
  permittedUses: "",
  licenseLimits: "",
  warrantyPeriod: "",
  paymentProcess: "invoicing",
  fees: "",
  governingLaw: "",
  chosenCourts: "",
  providerNoticeAddress: "",
  customerNoticeAddress: "",
};

export const PAYMENT_PROCESS_LABELS: Record<
  SoftwareLicenseFormData["paymentProcess"],
  string
> = {
  invoicing: "Invoicing",
  automatic: "Automatic payment",
};
