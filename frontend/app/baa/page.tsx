import DocCreator from "@/components/DocCreator";
import BaaForm from "@/components/BaaForm";
import BaaPreview from "@/components/BaaPreview";
import { defaultFormData } from "@/lib/baa-fields";

export default function BaaPage() {
  return (
    <DocCreator
      docType="baa"
      docName="Business Associate Agreement"
      defaultFormData={defaultFormData}
      FormComponent={BaaForm}
      PreviewComponent={BaaPreview}
    />
  );
}
