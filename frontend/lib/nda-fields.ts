export interface NdaFormData {
  purpose: string;
  effectiveDate: string;
  mndaTerm: "1year" | "indefinite";
  termOfConfidentiality: "1year" | "perpetual";
  governingLaw: string;
  jurisdiction: string;

  party1Company: string;
  party1Name: string;
  party1Title: string;
  party1Address: string;
  party1Date: string;

  party2Company: string;
  party2Name: string;
  party2Title: string;
  party2Address: string;
  party2Date: string;
}

export const defaultFormData: NdaFormData = {
  purpose:
    "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: "",
  mndaTerm: "1year",
  termOfConfidentiality: "1year",
  governingLaw: "",
  jurisdiction: "",
  party1Company: "",
  party1Name: "",
  party1Title: "",
  party1Address: "",
  party1Date: "",
  party2Company: "",
  party2Name: "",
  party2Title: "",
  party2Address: "",
  party2Date: "",
};
