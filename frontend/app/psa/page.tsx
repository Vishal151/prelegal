"use client";

import DocCreator from "@/components/DocCreator";
import PsaForm from "@/components/PsaForm";
import PsaPreview from "@/components/PsaPreview";
import { defaultFormData } from "@/lib/psa-fields";

export default function PsaPage() {
  return (
    <DocCreator
      docType="psa"
      docName="Professional Services Agreement"
      defaultFormData={defaultFormData}
      FormComponent={PsaForm}
      PreviewComponent={PsaPreview}
    />
  );
}
