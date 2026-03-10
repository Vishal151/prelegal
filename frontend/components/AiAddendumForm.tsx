"use client";

import { AiAddendumFormData, MODEL_TRAINING_LABELS } from "@/lib/ai-addendum-fields";
import { inputClass, textareaClass, legendClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: AiAddendumFormData;
  onChange: <K extends keyof AiAddendumFormData>(field: K, value: AiAddendumFormData[K]) => void;
  onDownload: () => void;
}

export default function AiAddendumForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the AI Addendum
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Product & AI Services">
          <Field label="Product" htmlFor="product">
            <textarea
              id="product"
              rows={2}
              className={textareaClass}
              value={data.product}
              onChange={(e) => onChange("product", e.target.value)}
              placeholder="Description of the AI-powered product or service"
            />
          </Field>

          <fieldset>
            <legend className={legendClass}>Model Training</legend>
            <div className="space-y-1.5 mt-1">
              {(
                Object.entries(MODEL_TRAINING_LABELS) as Array<
                  [AiAddendumFormData["modelTraining"], string]
                >
              ).map(([value, uiLabel]) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="modelTraining"
                    value={value}
                    checked={data.modelTraining === value}
                    onChange={() => onChange("modelTraining", value)}
                    className="text-[#209dd7] focus:ring-[#209dd7]"
                  />
                  <span className="text-sm text-slate-700">{uiLabel}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Field label="Training Data" htmlFor="trainingData">
            <textarea
              id="trainingData"
              rows={2}
              className={textareaClass}
              value={data.trainingData}
              onChange={(e) => onChange("trainingData", e.target.value)}
              placeholder="Description of data used for training"
            />
          </Field>

          <Field label="Training Purposes" htmlFor="trainingPurposes">
            <textarea
              id="trainingPurposes"
              rows={2}
              className={textareaClass}
              value={data.trainingPurposes}
              onChange={(e) => onChange("trainingPurposes", e.target.value)}
              placeholder="Permitted purposes for model training"
            />
          </Field>

          <Field label="Training Restrictions" htmlFor="trainingRestrictions">
            <textarea
              id="trainingRestrictions"
              rows={2}
              className={textareaClass}
              value={data.trainingRestrictions}
              onChange={(e) => onChange("trainingRestrictions", e.target.value)}
              placeholder="Restrictions on model training"
            />
          </Field>

          <Field label="Improvement Restrictions" htmlFor="improvementRestrictions">
            <textarea
              id="improvementRestrictions"
              rows={2}
              className={textareaClass}
              value={data.improvementRestrictions}
              onChange={(e) => onChange("improvementRestrictions", e.target.value)}
              placeholder="Restrictions on service improvement using customer data"
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
              placeholder="Acme AI Inc."
            />
          </Field>

          <Field label="Notice Address" htmlFor="providerNoticeAddress">
            <input
              id="providerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.providerNoticeAddress}
              onChange={(e) => onChange("providerNoticeAddress", e.target.value)}
              placeholder="legal@acme-ai.com"
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
              placeholder="Beta Corp."
            />
          </Field>

          <Field label="Notice Address" htmlFor="customerNoticeAddress">
            <input
              id="customerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.customerNoticeAddress}
              onChange={(e) => onChange("customerNoticeAddress", e.target.value)}
              placeholder="legal@betacorp.com"
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
          Opens browser print dialog — choose &ldquo;Save as PDF&rdquo;
        </p>
      </div>
    </div>
  );
}
