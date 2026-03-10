"use client";

import { DpaFormData } from "@/lib/dpa-fields";
import { inputClass, textareaClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: DpaFormData;
  onChange: <K extends keyof DpaFormData>(field: K, value: DpaFormData[K]) => void;
  onDownload: () => void;
}

export default function DpaForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the Data Processing Agreement
        </p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Processing Details">
          <Field label="Subject Matter" htmlFor="subjectMatter">
            <textarea
              id="subjectMatter"
              rows={2}
              className={textareaClass}
              value={data.subjectMatter}
              onChange={(e) => onChange("subjectMatter", e.target.value)}
              placeholder="e.g. Processing of customer data in connection with the Cloud Service Agreement"
            />
          </Field>

          <Field label="Nature of Processing" htmlFor="natureOfProcessing">
            <textarea
              id="natureOfProcessing"
              rows={2}
              className={textareaClass}
              value={data.natureOfProcessing}
              onChange={(e) => onChange("natureOfProcessing", e.target.value)}
              placeholder="e.g. Collection, storage, retrieval, use, and erasure"
            />
          </Field>

          <Field label="Purpose of Processing" htmlFor="purposeOfProcessing">
            <textarea
              id="purposeOfProcessing"
              rows={2}
              className={textareaClass}
              value={data.purposeOfProcessing}
              onChange={(e) => onChange("purposeOfProcessing", e.target.value)}
              placeholder="e.g. To provide and maintain the cloud service"
            />
          </Field>

          <Field label="Duration of Processing" htmlFor="durationOfProcessing">
            <input
              id="durationOfProcessing"
              type="text"
              className={inputClass}
              value={data.durationOfProcessing}
              onChange={(e) => onChange("durationOfProcessing", e.target.value)}
              placeholder="e.g. Duration of the Cloud Service Agreement"
            />
          </Field>

          <Field label="Categories of Data" htmlFor="categoriesOfData">
            <textarea
              id="categoriesOfData"
              rows={2}
              className={textareaClass}
              value={data.categoriesOfData}
              onChange={(e) => onChange("categoriesOfData", e.target.value)}
              placeholder="e.g. Names, email addresses, usage data, IP addresses"
            />
          </Field>

          <Field label="Categories of Data Subjects" htmlFor="categoriesOfSubjects">
            <textarea
              id="categoriesOfSubjects"
              rows={2}
              className={textareaClass}
              value={data.categoriesOfSubjects}
              onChange={(e) => onChange("categoriesOfSubjects", e.target.value)}
              placeholder="e.g. Customer employees, end users, business contacts"
            />
          </Field>

          <Field label="Approved Subprocessors" htmlFor="approvedSubprocessors">
            <textarea
              id="approvedSubprocessors"
              rows={2}
              className={textareaClass}
              value={data.approvedSubprocessors}
              onChange={(e) => onChange("approvedSubprocessors", e.target.value)}
              placeholder="e.g. AWS (hosting), Stripe (payments)"
            />
          </Field>
        </Section>

        <Section title="Agreement Terms">
          <Field label="Effective Date" htmlFor="effectiveDate">
            <input
              id="effectiveDate"
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => onChange("effectiveDate", e.target.value)}
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
        </Section>

        <Section title="Provider">
          <Field label="Company" htmlFor="providerCompany">
            <input
              id="providerCompany"
              type="text"
              className={inputClass}
              value={data.providerCompany}
              onChange={(e) => onChange("providerCompany", e.target.value)}
              placeholder="e.g. Acme Inc."
            />
          </Field>

          <Field label="Notice Address" htmlFor="providerNoticeAddress">
            <input
              id="providerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.providerNoticeAddress}
              onChange={(e) => onChange("providerNoticeAddress", e.target.value)}
              placeholder="e.g. privacy@acme.com"
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
              placeholder="e.g. privacy@betacorp.com"
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
