export interface PilotFormData {
  providerCompany: string;
  customerCompany: string;
  product: string;
  effectiveDate: string;
  pilotPeriod: string;
  evaluationPurposes: string;
  fees: string;
  governingLaw: string;
  chosenCourts: string;
  providerNoticeAddress: string;
  customerNoticeAddress: string;
}

export const defaultFormData: PilotFormData = {
  providerCompany: "",
  customerCompany: "",
  product: "",
  effectiveDate: "",
  pilotPeriod: "",
  evaluationPurposes: "",
  fees: "",
  governingLaw: "",
  chosenCourts: "",
  providerNoticeAddress: "",
  customerNoticeAddress: "",
};
