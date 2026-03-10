"use client";

import { SlaFormData } from "@/lib/sla-fields";
import { inputClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: SlaFormData;
  onChange: <K extends keyof SlaFormData>(field: K, value: SlaFormData[K]) => void;
  onDownload: () => void;
}

export default function SlaForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          SLA Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the SLA
        </p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Service Details">
          <Field label="Provider Company" htmlFor="providerCompany">
            <input
              id="providerCompany"
              type="text"
              className={inputClass}
              value={data.providerCompany}
              onChange={(e) => onChange("providerCompany", e.target.value)}
              placeholder="e.g. Acme Cloud Inc."
            />
          </Field>

          <Field label="Customer Company" htmlFor="customerCompany">
            <input
              id="customerCompany"
              type="text"
              className={inputClass}
              value={data.customerCompany}
              onChange={(e) => onChange("customerCompany", e.target.value)}
              placeholder="e.g. Beta Corp."
            />
          </Field>

          <Field label="Cloud Service" htmlFor="cloudService">
            <input
              id="cloudService"
              type="text"
              className={inputClass}
              value={data.cloudService}
              onChange={(e) => onChange("cloudService", e.target.value)}
              placeholder="e.g. Acme Platform"
            />
          </Field>
        </Section>

        <Section title="Service Levels">
          <Field label="Target Uptime" htmlFor="targetUptime">
            <input
              id="targetUptime"
              type="text"
              className={inputClass}
              value={data.targetUptime}
              onChange={(e) => onChange("targetUptime", e.target.value)}
              placeholder="e.g. 99.9%"
            />
          </Field>

          <Field label="Target Response Time" htmlFor="targetResponseTime">
            <input
              id="targetResponseTime"
              type="text"
              className={inputClass}
              value={data.targetResponseTime}
              onChange={(e) => onChange("targetResponseTime", e.target.value)}
              placeholder="e.g. 4 hours"
            />
          </Field>

          <Field label="Support Channel" htmlFor="supportChannel">
            <input
              id="supportChannel"
              type="text"
              className={inputClass}
              value={data.supportChannel}
              onChange={(e) => onChange("supportChannel", e.target.value)}
              placeholder="e.g. Email and phone"
            />
          </Field>
        </Section>

        <Section title="Service Credits">
          <Field label="Uptime Credit (%)" htmlFor="uptimeCreditPercent">
            <input
              id="uptimeCreditPercent"
              type="text"
              className={inputClass}
              value={data.uptimeCreditPercent}
              onChange={(e) => onChange("uptimeCreditPercent", e.target.value)}
              placeholder="e.g. 5%"
            />
          </Field>

          <Field label="Response Time Credit (%)" htmlFor="responseTimeCreditPercent">
            <input
              id="responseTimeCreditPercent"
              type="text"
              className={inputClass}
              value={data.responseTimeCreditPercent}
              onChange={(e) => onChange("responseTimeCreditPercent", e.target.value)}
              placeholder="e.g. 5%"
            />
          </Field>

          <Field label="Max Credit (%)" htmlFor="maxCreditPercent">
            <input
              id="maxCreditPercent"
              type="text"
              className={inputClass}
              value={data.maxCreditPercent}
              onChange={(e) => onChange("maxCreditPercent", e.target.value)}
              placeholder="e.g. 15%"
            />
          </Field>
        </Section>
      </div>

      {/* Footer with download button */}
      <div className="px-6 py-4 bg-white border-t border-slate-200 shrink-0">
        <button
          onClick={onDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-2.5 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download as PDF
        </button>
        <p className="text-xs text-slate-400 text-center mt-2">
          Opens browser print dialog — choose &ldquo;Save as PDF&rdquo;
        </p>
      </div>
    </div>
  );
}
