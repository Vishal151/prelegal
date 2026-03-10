"use client";

import {
  NdaFormData,
  MNDA_TERM_LABELS,
  TOC_LABELS,
} from "@/lib/nda-fields";
import { inputClass, textareaClass, legendClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: NdaFormData;
  onChange: <K extends keyof NdaFormData>(field: K, value: NdaFormData[K]) => void;
  onDownload: () => void;
}

// ─── Party field configuration ────────────────────────────────────────────────

type PartyFieldDef = {
  suffix: "Company" | "Name" | "Title" | "Address" | "Date";
  label: string;
  type: "text" | "date";
};

const PARTY_FIELD_DEFS: PartyFieldDef[] = [
  { suffix: "Company", label: "Company", type: "text" },
  { suffix: "Name", label: "Printed Name", type: "text" },
  { suffix: "Title", label: "Title", type: "text" },
  { suffix: "Address", label: "Notice Address", type: "text" },
  { suffix: "Date", label: "Signing Date", type: "date" },
];

const PARTY_PLACEHOLDERS: Record<1 | 2, Record<PartyFieldDef["suffix"], string>> = {
  1: {
    Company: "Acme Inc.",
    Name: "Jane Smith",
    Title: "Chief Executive Officer",
    Address: "legal@acme.com",
    Date: "",
  },
  2: {
    Company: "Beta Corp.",
    Name: "John Doe",
    Title: "Chief Executive Officer",
    Address: "legal@betacorp.com",
    Date: "",
  },
};

function PartySection({
  party,
  data,
  onChange,
}: {
  party: 1 | 2;
  data: NdaFormData;
  onChange: Props["onChange"];
}) {
  return (
    <Section title={`Party ${party}`}>
      {PARTY_FIELD_DEFS.map(({ suffix, label, type }) => {
        const key =
          `party${party}${suffix}` as keyof NdaFormData;
        return (
          <Field key={key} label={label} htmlFor={key}>
            <input
              id={key}
              type={type}
              className={inputClass}
              value={data[key] as string}
              onChange={(e) =>
                onChange(key, e.target.value as NdaFormData[typeof key])
              }
              placeholder={PARTY_PLACEHOLDERS[party][suffix]}
            />
          </Field>
        );
      })}
    </Section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function NdaForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the NDA
        </p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Agreement Terms">
          {/* Purpose */}
          <Field label="Purpose" htmlFor="purpose">
            <textarea
              id="purpose"
              rows={3}
              className={textareaClass}
              value={data.purpose}
              onChange={(e) => onChange("purpose", e.target.value)}
              placeholder="Purpose of sharing confidential information"
            />
          </Field>

          {/* Effective Date */}
          <Field label="Effective Date" htmlFor="effectiveDate">
            <input
              id="effectiveDate"
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => onChange("effectiveDate", e.target.value)}
            />
          </Field>

          {/* MNDA Term — radio group with fieldset/legend for screen readers */}
          <fieldset>
            <legend className={legendClass}>MNDA Term</legend>
            <div className="space-y-1.5 mt-1">
              {(
                Object.entries(MNDA_TERM_LABELS) as Array<
                  [NdaFormData["mndaTerm"], string]
                >
              ).map(([value, docLabel]) => {
                // Capitalize the first letter for the form UI label
                const uiLabel =
                  docLabel.charAt(0).toUpperCase() + docLabel.slice(1);
                return (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="mndaTerm"
                      value={value}
                      checked={data.mndaTerm === value}
                      onChange={() => onChange("mndaTerm", value)}
                      className="text-[#209dd7] focus:ring-[#209dd7]"
                    />
                    <span className="text-sm text-slate-700">{uiLabel}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Term of Confidentiality — radio group */}
          <fieldset>
            <legend className={legendClass}>Term of Confidentiality</legend>
            <div className="space-y-1.5 mt-1">
              {(
                Object.entries(TOC_LABELS) as Array<
                  [NdaFormData["termOfConfidentiality"], string]
                >
              ).map(([value, docLabel]) => {
                const uiLabel =
                  docLabel.charAt(0).toUpperCase() + docLabel.slice(1);
                return (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="termOfConfidentiality"
                      value={value}
                      checked={data.termOfConfidentiality === value}
                      onChange={() =>
                        onChange("termOfConfidentiality", value)
                      }
                      className="text-[#209dd7] focus:ring-[#209dd7]"
                    />
                    <span className="text-sm text-slate-700">{uiLabel}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Governing Law */}
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

          {/* Jurisdiction */}
          <Field label="Jurisdiction (Courts)" htmlFor="jurisdiction">
            <input
              id="jurisdiction"
              type="text"
              className={inputClass}
              value={data.jurisdiction}
              onChange={(e) => onChange("jurisdiction", e.target.value)}
              placeholder="e.g. San Francisco, California"
            />
          </Field>
        </Section>

        <PartySection party={1} data={data} onChange={onChange} />
        <PartySection party={2} data={data} onChange={onChange} />
      </div>

      {/* Footer with download button */}
      <div className="px-6 py-4 bg-white border-t border-slate-200 shrink-0">
        <button
          onClick={onDownload}
          className="w-full bg-[#753991] hover:bg-[#612d79] active:bg-[#512570] text-white text-sm font-semibold py-2.5 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-[#209dd7] focus:ring-offset-2"
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
