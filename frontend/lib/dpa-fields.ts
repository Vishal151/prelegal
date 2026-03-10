export interface DpaFormData {
  providerCompany: string;
  customerCompany: string;
  effectiveDate: string;
  subjectMatter: string;
  natureOfProcessing: string;
  purposeOfProcessing: string;
  durationOfProcessing: string;
  categoriesOfData: string;
  categoriesOfSubjects: string;
  approvedSubprocessors: string;
  governingLaw: string;
  providerNoticeAddress: string;
  customerNoticeAddress: string;
}

export const defaultFormData: DpaFormData = {
  providerCompany: "",
  customerCompany: "",
  effectiveDate: "",
  subjectMatter: "",
  natureOfProcessing: "",
  purposeOfProcessing: "",
  durationOfProcessing: "",
  categoriesOfData: "",
  categoriesOfSubjects: "",
  approvedSubprocessors: "",
  governingLaw: "",
  providerNoticeAddress: "",
  customerNoticeAddress: "",
};
