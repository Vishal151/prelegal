import DocCreator from "@/components/DocCreator";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import { defaultFormData } from "@/lib/nda-fields";

export default function NdaPage() {
  return (
    <DocCreator
      docType="nda"
      docName="Mutual Non-Disclosure Agreement"
      defaultFormData={defaultFormData}
      FormComponent={NdaForm}
      PreviewComponent={NdaPreview}
    />
  );
}
