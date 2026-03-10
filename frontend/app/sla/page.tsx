"use client";

import DocCreator from "@/components/DocCreator";
import SlaForm from "@/components/SlaForm";
import SlaPreview from "@/components/SlaPreview";
import { defaultFormData } from "@/lib/sla-fields";

export default function SlaPage() {
  return (
    <DocCreator
      docType="sla"
      docName="Service Level Agreement"
      defaultFormData={defaultFormData}
      FormComponent={SlaForm}
      PreviewComponent={SlaPreview}
    />
  );
}
