"use client";

import { PsaFormData } from "@/lib/psa-fields";
import { inputClass, textareaClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: PsaFormData;
  onChange: <K extends keyof PsaFormData>(field: K, value: PsaFormData[K]) => void;
  onDownload: () => void;
}

export default function PsaForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the PSA
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Agreement Terms">
          <Field label="Services Description" htmlFor="servicesDescription">
            <textarea
              id="servicesDescription"
              rows={3}
              className={textareaClass}
              value={data.servicesDescription}
              onChange={(e) => onChange("servicesDescription", e.target.value)}
              placeholder="Describe the professional services to be provided"
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

          <Field label="Fees" htmlFor="fees">
            <input
              id="fees"
              type="text"
              className={inputClass}
              value={data.fees}
              onChange={(e) => onChange("fees", e.target.value)}
              placeholder="e.g. $50,000"
            />
          </Field>

          <Field label="Payment Period" htmlFor="paymentPeriod">
            <input
              id="paymentPeriod"
              type="text"
              className={inputClass}
              value={data.paymentPeriod}
              onChange={(e) => onChange("paymentPeriod", e.target.value)}
              placeholder="e.g. Net 30 days"
            />
          </Field>

          <Field label="Governing Law" htmlFor="governingLaw">
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
              placeholder="e.g. Acme Consulting Inc."
            />
          </Field>

          <Field label="Notice Address" htmlFor="providerNoticeAddress">
            <input
              id="providerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.providerNoticeAddress}
              onChange={(e) => onChange("providerNoticeAddress", e.target.value)}
              placeholder="e.g. legal@acmeconsulting.com"
            />
          </Field>
        </Section>

        <Section title="Customer">
          <Field label="Company" htmlFor="customerCompany">
            <input
              id="customerCompany"
              type="text"
              className={inputClass}
              value={data.customerCompany}
              onChange={(e) => onChange("customerCompany", e.target.value)}
              placeholder="e.g. Beta Corp."
            />
          </Field>

          <Field label="Notice Address" htmlFor="customerNoticeAddress">
            <input
              id="customerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.customerNoticeAddress}
              onChange={(e) => onChange("customerNoticeAddress", e.target.value)}
              placeholder="e.g. legal@betacorp.com"
            />
          </Field>
        </Section>
      </div>

      <div className="px-6 py-4 bg-white border-t border-slate-200 shrink-0">
        <button
          onClick={onDownload}
          className="w-full bg-[#753991] hover:bg-[#612d79] active:bg-[#512570] text-white text-sm font-semibold py-2.5 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-[#209dd7] focus:ring-offset-2"
        >
          Download as PDF
        </button>
        <p className="text-xs text-slate-400 text-center mt-2">
          Opens browser print dialog &mdash; choose &ldquo;Save as PDF&rdquo;
        </p>
      </div>
    </div>
  );
}
