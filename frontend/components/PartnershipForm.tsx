"use client";

import { PartnershipFormData } from "@/lib/partnership-fields";
import { inputClass, textareaClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: PartnershipFormData;
  onChange: <K extends keyof PartnershipFormData>(field: K, value: PartnershipFormData[K]) => void;
  onDownload: () => void;
}

export default function PartnershipForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the Partnership Agreement
        </p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Agreement Terms">
          <Field label="Partnership Purpose" htmlFor="partnershipPurpose">
            <textarea
              id="partnershipPurpose"
              rows={3}
              className={textareaClass}
              value={data.partnershipPurpose}
              onChange={(e) => onChange("partnershipPurpose", e.target.value)}
              placeholder="Describe the purpose of this partnership"
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

          <Field label="End Date" htmlFor="endDate">
            <input
              id="endDate"
              type="date"
              className={inputClass}
              value={data.endDate}
              onChange={(e) => onChange("endDate", e.target.value)}
            />
          </Field>

          <Field label="Fees" htmlFor="fees">
            <input
              id="fees"
              type="text"
              className={inputClass}
              value={data.fees}
              onChange={(e) => onChange("fees", e.target.value)}
              placeholder="e.g. $5,000/month"
            />
          </Field>

          <Field label="Payment Schedule" htmlFor="paymentSchedule">
            <input
              id="paymentSchedule"
              type="text"
              className={inputClass}
              value={data.paymentSchedule}
              onChange={(e) => onChange("paymentSchedule", e.target.value)}
              placeholder="e.g. Monthly, Net 30"
            />
          </Field>

          <Field label="Territory" htmlFor="territory">
            <input
              id="territory"
              type="text"
              className={inputClass}
              value={data.territory}
              onChange={(e) => onChange("territory", e.target.value)}
              placeholder="e.g. United States"
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

        <Section title="Company 1">
          <Field label="Company" htmlFor="company1">
            <input
              id="company1"
              type="text"
              className={inputClass}
              value={data.company1}
              onChange={(e) => onChange("company1", e.target.value)}
              placeholder="e.g. Acme Inc."
            />
          </Field>

          <Field label="Notice Address" htmlFor="company1NoticeAddress">
            <input
              id="company1NoticeAddress"
              type="text"
              className={inputClass}
              value={data.company1NoticeAddress}
              onChange={(e) => onChange("company1NoticeAddress", e.target.value)}
              placeholder="e.g. legal@acme.com"
            />
          </Field>
        </Section>

        <Section title="Company 2">
          <Field label="Company" htmlFor="company2">
            <input
              id="company2"
              type="text"
              className={inputClass}
              value={data.company2}
              onChange={(e) => onChange("company2", e.target.value)}
              placeholder="e.g. Beta Corp."
            />
          </Field>

          <Field label="Notice Address" htmlFor="company2NoticeAddress">
            <input
              id="company2NoticeAddress"
              type="text"
              className={inputClass}
              value={data.company2NoticeAddress}
              onChange={(e) => onChange("company2NoticeAddress", e.target.value)}
              placeholder="e.g. legal@betacorp.com"
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
          Opens browser print dialog &mdash; choose &ldquo;Save as PDF&rdquo;
        </p>
      </div>
    </div>
  );
}
