"use client";

export interface DesignPartnerFormData {
  providerCompany: string;
  partnerCompany: string;
  product: string;
  effectiveDate: string;
  term: string;
  programDescription: string;
  governingLaw: string;
  chosenCourts: string;
  providerNoticeAddress: string;
  partnerNoticeAddress: string;
}

export const defaultFormData: DesignPartnerFormData = {
  providerCompany: "",
  partnerCompany: "",
  product: "",
  effectiveDate: "",
  term: "",
  programDescription: "",
  governingLaw: "",
  chosenCourts: "",
  providerNoticeAddress: "",
  partnerNoticeAddress: "",
};
