"use client";

import DocCreator from "@/components/DocCreator";
import SoftwareLicenseForm from "@/components/SoftwareLicenseForm";
import SoftwareLicensePreview from "@/components/SoftwareLicensePreview";
import { defaultFormData } from "@/lib/software-license-fields";

export default function SoftwareLicensePage() {
  return (
    <DocCreator
      docType="software-license"
      docName="Software License Agreement"
      defaultFormData={defaultFormData}
      FormComponent={SoftwareLicenseForm}
      PreviewComponent={SoftwareLicensePreview}
    />
  );
}
