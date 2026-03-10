"use client";

import DocCreator from "@/components/DocCreator";
import DpaForm from "@/components/DpaForm";
import DpaPreview from "@/components/DpaPreview";
import { defaultFormData } from "@/lib/dpa-fields";

export default function DpaPage() {
  return (
    <DocCreator
      docType="dpa"
      docName="Data Processing Agreement"
      defaultFormData={defaultFormData}
      FormComponent={DpaForm}
      PreviewComponent={DpaPreview}
    />
  );
}
