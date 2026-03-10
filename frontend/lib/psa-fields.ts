export interface PsaFormData {
  providerCompany: string;
  customerCompany: string;
  effectiveDate: string;
  servicesDescription: string;
  fees: string;
  paymentPeriod: string;
  governingLaw: string;
  chosenCourts: string;
  providerNoticeAddress: string;
  customerNoticeAddress: string;
}

export const defaultFormData: PsaFormData = {
  providerCompany: "",
  customerCompany: "",
  effectiveDate: "",
  servicesDescription: "",
  fees: "",
  paymentPeriod: "",
  governingLaw: "",
  chosenCourts: "",
  providerNoticeAddress: "",
  customerNoticeAddress: "",
};
