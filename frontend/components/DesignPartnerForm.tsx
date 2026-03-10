"use client";

import { DesignPartnerFormData } from "@/lib/design-partner-fields";
import { Section, Field, inputClass, textareaClass } from "@/lib/form-helpers";

interface Props {
  data: DesignPartnerFormData;
  onChange: <K extends keyof DesignPartnerFormData>(field: K, value: DesignPartnerFormData[K]) => void;
  onDownload: () => void;
}

export default function DesignPartnerForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the Design Partner Agreement
        </p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Agreement Terms">
          <Field label="Product" htmlFor="product">
            <textarea
              id="product"
              rows={3}
              className={textareaClass}
              value={data.product}
              onChange={(e) => onChange("product", e.target.value)}
              placeholder="Description of the product or service"
            />
          </Field>

          <Field label="Effective Date" htmlFor="effectiveDate">
            <input
              id="effectiveDate"
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => onChange("effectiveDate", e.target.value)}
            />
          </Field>

          <Field label="Term" htmlFor="term">
            <input
              id="term"
              type="text"
              className={inputClass}
              value={data.term}
              onChange={(e) => onChange("term", e.target.value)}
              placeholder="e.g. 12 months from the Effective Date"
            />
          </Field>

          <Field label="Program Description" htmlFor="programDescription">
            <textarea
              id="programDescription"
              rows={3}
              className={textareaClass}
              value={data.programDescription}
              onChange={(e) => onChange("programDescription", e.target.value)}
              placeholder="Description of the design partner program"
            />
          </Field>

          <Field label="Governing Law (State)" htmlFor="governingLaw">
            <input
              id="governingLaw"
              type="text"
              className={inputClass}
              value={data.governingLaw}
              onChange={(e) => onChange("governingLaw", e.target.value)}
              placeholder="e.g. California"
            />
          </Field>

          <Field label="Chosen Courts" htmlFor="chosenCourts">
            <input
              id="chosenCourts"
              type="text"
              className={inputClass}
              value={data.chosenCourts}
              onChange={(e) => onChange("chosenCourts", e.target.value)}
              placeholder="e.g. San Francisco, California"
            />
          </Field>
        </Section>

        <Section title="Provider">
          <Field label="Company" htmlFor="providerCompany">
            <input
              id="providerCompany"
              type="text"
              className={inputClass}
              value={data.providerCompany}
              onChange={(e) => onChange("providerCompany", e.target.value)}
              placeholder="Acme Inc."
            />
          </Field>

          <Field label="Notice Address" htmlFor="providerNoticeAddress">
            <input
              id="providerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.providerNoticeAddress}
              onChange={(e) => onChange("providerNoticeAddress", e.target.value)}
              placeholder="legal@acme.com"
            />
          </Field>
        </Section>

        <Section title="Partner">
          <Field label="Company" htmlFor="partnerCompany">
            <input
              id="partnerCompany"
              type="text"
              className={inputClass}
              value={data.partnerCompany}
              onChange={(e) => onChange("partnerCompany", e.target.value)}
              placeholder="Beta Corp."
            />
          </Field>

          <Field label="Notice Address" htmlFor="partnerNoticeAddress">
            <input
              id="partnerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.partnerNoticeAddress}
              onChange={(e) => onChange("partnerNoticeAddress", e.target.value)}
              placeholder="legal@betacorp.com"
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
