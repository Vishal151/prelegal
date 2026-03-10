"use client";

import DocCreator from "@/components/DocCreator";
import DesignPartnerForm from "@/components/DesignPartnerForm";
import DesignPartnerPreview from "@/components/DesignPartnerPreview";
import { defaultFormData } from "@/lib/design-partner-fields";

export default function DesignPartnerPage() {
  return (
    <DocCreator
      docType="design-partner"
      docName="Design Partner Agreement"
      defaultFormData={defaultFormData}
      FormComponent={DesignPartnerForm}
      PreviewComponent={DesignPartnerPreview}
    />
  );
}
