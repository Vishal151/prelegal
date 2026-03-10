"use client";

import { useState } from "react";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import { defaultFormData, NdaFormData } from "@/lib/nda-fields";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);

  function handleChange(field: keyof NdaFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleDownload() {
    window.print();
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left panel — form (hidden on print) */}
      <div className="w-96 shrink-0 flex flex-col overflow-hidden print:hidden">
        <NdaForm
          data={formData}
          onChange={handleChange}
          onDownload={handleDownload}
        />
      </div>

      {/* Right panel — NDA preview (scrollable on screen, full-width on print) */}
      <div className="flex-1 overflow-y-auto bg-slate-100 print:overflow-visible print:bg-white">
        <div className="max-w-3xl mx-auto my-6 shadow-sm rounded-lg overflow-hidden print:shadow-none print:rounded-none print:my-0 print:max-w-none">
          <NdaPreview data={formData} />
        </div>
      </div>
    </div>
  );
}
