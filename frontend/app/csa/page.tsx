import DocCreator from "@/components/DocCreator";
import CsaForm from "@/components/CsaForm";
import CsaPreview from "@/components/CsaPreview";
import { defaultFormData } from "@/lib/csa-fields";

export default function CsaPage() {
  return (
    <DocCreator
      docType="csa"
      docName="Cloud Service Agreement"
      defaultFormData={defaultFormData}
      FormComponent={CsaForm}
      PreviewComponent={CsaPreview}
    />
  );
}
