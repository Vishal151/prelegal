"use client";

import DocCreator from "@/components/DocCreator";
import PartnershipForm from "@/components/PartnershipForm";
import PartnershipPreview from "@/components/PartnershipPreview";
import { defaultFormData } from "@/lib/partnership-fields";

export default function PartnershipPage() {
  return (
    <DocCreator
      docType="partnership"
      docName="Partnership Agreement"
      defaultFormData={defaultFormData}
      FormComponent={PartnershipForm}
      PreviewComponent={PartnershipPreview}
    />
  );
}
