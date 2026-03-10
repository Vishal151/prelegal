"use client";

import { NdaFormData } from "@/lib/nda-fields";

interface Props {
  data: NdaFormData;
  onChange: (field: keyof NdaFormData, value: string) => void;
  onDownload: () => void;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 pb-1 border-b border-slate-200">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const textareaClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none";

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
          <Field label="Purpose">
            <textarea
              rows={3}
              className={textareaClass}
              value={data.purpose}
              onChange={(e) => onChange("purpose", e.target.value)}
              placeholder="Purpose of sharing confidential information"
            />
          </Field>

          <Field label="Effective Date">
            <input
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => onChange("effectiveDate", e.target.value)}
            />
          </Field>

          <Field label="MNDA Term">
            <div className="space-y-1.5">
              {(
                [
                  { value: "1year", label: "1 year from the Effective Date" },
                  {
                    value: "indefinite",
                    label: "Indefinite, until terminated by either party",
                  },
                ] as const
              ).map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mndaTerm"
                    value={value}
                    checked={data.mndaTerm === value}
                    onChange={() => onChange("mndaTerm", value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Term of Confidentiality">
            <div className="space-y-1.5">
              {(
                [
                  {
                    value: "1year",
                    label: "1 year from the Effective Date",
                  },
                  { value: "perpetual", label: "Perpetual" },
                ] as const
              ).map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="termOfConfidentiality"
                    value={value}
                    checked={data.termOfConfidentiality === value}
                    onChange={() =>
                      onChange("termOfConfidentiality", value)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Governing Law (State)">
            <input
              type="text"
              className={inputClass}
              value={data.governingLaw}
              onChange={(e) => onChange("governingLaw", e.target.value)}
              placeholder="e.g. California"
            />
          </Field>

          <Field label="Jurisdiction (Courts)">
            <input
              type="text"
              className={inputClass}
              value={data.jurisdiction}
              onChange={(e) => onChange("jurisdiction", e.target.value)}
              placeholder="e.g. San Francisco, California"
            />
          </Field>
        </Section>

        <Section title="Party 1">
          {(
            [
              {
                key: "party1Company" as const,
                label: "Company",
                placeholder: "Acme Inc.",
                type: "text",
              },
              {
                key: "party1Name" as const,
                label: "Printed Name",
                placeholder: "Jane Smith",
                type: "text",
              },
              {
                key: "party1Title" as const,
                label: "Title",
                placeholder: "Chief Executive Officer",
                type: "text",
              },
              {
                key: "party1Address" as const,
                label: "Notice Address",
                placeholder: "legal@acme.com",
                type: "text",
              },
              {
                key: "party1Date" as const,
                label: "Signing Date",
                placeholder: "",
                type: "date",
              },
            ] as const
          ).map(({ key, label, placeholder, type }) => (
            <Field key={key} label={label}>
              <input
                type={type}
                className={inputClass}
                value={data[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
              />
            </Field>
          ))}
        </Section>

        <Section title="Party 2">
          {(
            [
              {
                key: "party2Company" as const,
                label: "Company",
                placeholder: "Beta Corp.",
                type: "text",
              },
              {
                key: "party2Name" as const,
                label: "Printed Name",
                placeholder: "John Doe",
                type: "text",
              },
              {
                key: "party2Title" as const,
                label: "Title",
                placeholder: "Chief Executive Officer",
                type: "text",
              },
              {
                key: "party2Address" as const,
                label: "Notice Address",
                placeholder: "legal@betacorp.com",
                type: "text",
              },
              {
                key: "party2Date" as const,
                label: "Signing Date",
                placeholder: "",
                type: "date",
              },
            ] as const
          ).map(({ key, label, placeholder, type }) => (
            <Field key={key} label={label}>
              <input
                type={type}
                className={inputClass}
                value={data[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
              />
            </Field>
          ))}
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
