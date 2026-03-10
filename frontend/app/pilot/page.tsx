import DocCreator from "@/components/DocCreator";
import PilotForm from "@/components/PilotForm";
import PilotPreview from "@/components/PilotPreview";
import { defaultFormData } from "@/lib/pilot-fields";

export default function PilotPage() {
  return (
    <DocCreator
      docType="pilot"
      docName="Pilot Agreement"
      defaultFormData={defaultFormData}
      FormComponent={PilotForm}
      PreviewComponent={PilotPreview}
    />
  );
}
