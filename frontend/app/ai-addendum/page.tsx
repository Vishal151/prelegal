import DocCreator from "@/components/DocCreator";
import AiAddendumForm from "@/components/AiAddendumForm";
import AiAddendumPreview from "@/components/AiAddendumPreview";
import { defaultFormData } from "@/lib/ai-addendum-fields";

export default function AiAddendumPage() {
  return (
    <DocCreator
      docType="ai-addendum"
      docName="AI Addendum"
      defaultFormData={defaultFormData}
      FormComponent={AiAddendumForm}
      PreviewComponent={AiAddendumPreview}
    />
  );
}
