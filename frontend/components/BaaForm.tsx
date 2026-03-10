"use client";

import {
  BaaFormData,
  OFFSHORING_LABELS,
  DEIDENTIFICATION_LABELS,
  AGGREGATION_LABELS,
} from "@/lib/baa-fields";
import { inputClass, textareaClass, legendClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: BaaFormData;
  onChange: <K extends keyof BaaFormData>(field: K, value: BaaFormData[K]) => void;
  onDownload: () => void;
}

function RadioGroup<K extends "offshoringAllowed" | "deidentificationAllowed" | "aggregationAllowed">({
  name,
  label,
  value,
  labels,
  onChange,
}: {
  name: K;
  label: string;
  value: BaaFormData[K];
  labels: Record<string, string>;
  onChange: (field: K, value: BaaFormData[K]) => void;
}) {
  return (
    <fieldset>
      <legend className={legendClass}>{label}</legend>
      <div className="space-y-1.5 mt-1">
        {(Object.entries(labels) as Array<[string, string]>).map(([val, uiLabel]) => (
          <label key={val} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={val}
              checked={value === val}
              onChange={() => onChange(name, val as BaaFormData[K])}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">{uiLabel}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function BaaForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the BAA
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
              placeholder="Description of the services involving PHI"
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

          <Field label="Breach Notification Days" htmlFor="breachNotificationDays">
            <input
              id="breachNotificationDays"
              type="text"
              className={inputClass}
              value={data.breachNotificationDays}
              onChange={(e) => onChange("breachNotificationDays", e.target.value)}
              placeholder="e.g. 60"
            />
          </Field>

          <RadioGroup
            name="offshoringAllowed"
            label="Offshoring"
            value={data.offshoringAllowed}
            labels={OFFSHORING_LABELS}
            onChange={onChange}
          />

          <RadioGroup
            name="deidentificationAllowed"
            label="De-identification"
            value={data.deidentificationAllowed}
            labels={DEIDENTIFICATION_LABELS}
            onChange={onChange}
          />

          <RadioGroup
            name="aggregationAllowed"
            label="Aggregation"
            value={data.aggregationAllowed}
            labels={AGGREGATION_LABELS}
            onChange={onChange}
          />
        </Section>

        <Section title="Provider">
          <Field label="Company" htmlFor="providerCompany">
            <input
              id="providerCompany"
              type="text"
              className={inputClass}
              value={data.providerCompany}
              onChange={(e) => onChange("providerCompany", e.target.value)}
              placeholder="Acme Health Inc."
            />
          </Field>

          <Field label="Notice Address" htmlFor="providerNoticeAddress">
            <input
              id="providerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.providerNoticeAddress}
              onChange={(e) => onChange("providerNoticeAddress", e.target.value)}
              placeholder="privacy@acme.com"
            />
          </Field>
        </Section>

        <Section title="Covered Entity">
          <Field label="Company" htmlFor="companyName">
            <input
              id="companyName"
              type="text"
              className={inputClass}
              value={data.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
              placeholder="Beta Healthcare Corp."
            />
          </Field>

          <Field label="Notice Address" htmlFor="companyNoticeAddress">
            <input
              id="companyNoticeAddress"
              type="text"
              className={inputClass}
              value={data.companyNoticeAddress}
              onChange={(e) => onChange("companyNoticeAddress", e.target.value)}
              placeholder="privacy@betahealthcare.com"
            />
          </Field>
        </Section>
      </div>

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
