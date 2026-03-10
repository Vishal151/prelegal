export interface AiAddendumFormData {
  providerCompany: string;
  customerCompany: string;
  product: string;
  modelTraining: "enabled" | "disabled";
  trainingData: string;
  trainingPurposes: string;
  trainingRestrictions: string;
  improvementRestrictions: string;
  providerNoticeAddress: string;
  customerNoticeAddress: string;
}

export const defaultFormData: AiAddendumFormData = {
  providerCompany: "",
  customerCompany: "",
  product: "",
  modelTraining: "disabled",
  trainingData: "",
  trainingPurposes: "",
  trainingRestrictions: "",
  improvementRestrictions: "",
  providerNoticeAddress: "",
  customerNoticeAddress: "",
};

export const MODEL_TRAINING_LABELS: Record<AiAddendumFormData["modelTraining"], string> = {
  enabled: "Enabled",
  disabled: "Disabled",
};
