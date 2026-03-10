export interface CsaFormData {
  providerCompany: string;
  customerCompany: string;
  cloudService: string;
  subscriptionPeriod: string;
  orderDate: string;
  nonRenewalNoticeDays: string;
  technicalSupport: string;
  paymentProcess: "invoicing" | "automatic";
  fees: string;
  governingLaw: string;
  chosenCourts: string;
  providerNoticeAddress: string;
  customerNoticeAddress: string;
}

export const defaultFormData: CsaFormData = {
  providerCompany: "",
  customerCompany: "",
  cloudService: "",
  subscriptionPeriod: "",
  orderDate: "",
  nonRenewalNoticeDays: "",
  technicalSupport: "",
  paymentProcess: "invoicing",
  fees: "",
  governingLaw: "",
  chosenCourts: "",
  providerNoticeAddress: "",
  customerNoticeAddress: "",
};

/** Legal document text for Payment Process (used in CSA body). */
export const PAYMENT_PROCESS_LABELS: Record<CsaFormData["paymentProcess"], string> = {
  invoicing: "Invoicing",
  automatic: "Automatic Payment",
};
