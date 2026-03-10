export interface SlaFormData {
  providerCompany: string;
  customerCompany: string;
  cloudService: string;
  targetUptime: string;
  targetResponseTime: string;
  supportChannel: string;
  uptimeCreditPercent: string;
  responseTimeCreditPercent: string;
  maxCreditPercent: string;
}

export const defaultFormData: SlaFormData = {
  providerCompany: "",
  customerCompany: "",
  cloudService: "",
  targetUptime: "",
  targetResponseTime: "",
  supportChannel: "",
  uptimeCreditPercent: "",
  responseTimeCreditPercent: "",
  maxCreditPercent: "",
};
