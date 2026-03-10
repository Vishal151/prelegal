export interface PartnershipFormData {
  company1: string;
  company2: string;
  effectiveDate: string;
  endDate: string;
  partnershipPurpose: string;
  fees: string;
  paymentSchedule: string;
  territory: string;
  governingLaw: string;
  chosenCourts: string;
  company1NoticeAddress: string;
  company2NoticeAddress: string;
}

export const defaultFormData: PartnershipFormData = {
  company1: "",
  company2: "",
  effectiveDate: "",
  endDate: "",
  partnershipPurpose: "",
  fees: "",
  paymentSchedule: "",
  territory: "",
  governingLaw: "",
  chosenCourts: "",
  company1NoticeAddress: "",
  company2NoticeAddress: "",
};
