"use client";

import {
  SoftwareLicenseFormData,
  PAYMENT_PROCESS_LABELS,
} from "@/lib/software-license-fields";
import {
  inputClass,
  textareaClass,
  legendClass,
  Section,
  Field,
} from "@/lib/form-helpers";

interface Props {
  data: SoftwareLicenseFormData;
  onChange: <K extends keyof SoftwareLicenseFormData>(
    field: K,
    value: SoftwareLicenseFormData[K]
  ) => void;
  onDownload: () => void;
}

export default function SoftwareLicenseForm({
  data,
  onChange,
  onDownload,
}: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the Software License Agreement
        </p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="License Terms">
          <Field label="Software" htmlFor="software">
            <textarea
              id="software"
              rows={3}
              className={textareaClass}
              value={data.software}
              onChange={(e) => onChange("software", e.target.value)}
              placeholder="Description of the licensed software"
            />
          </Field>

          <Field label="Subscription Period" htmlFor="subscriptionPeriod">
            <input
              id="subscriptionPeriod"
              type="text"
              className={inputClass}
              value={data.subscriptionPeriod}
              onChange={(e) => onChange("subscriptionPeriod", e.target.value)}
              placeholder="e.g. 1 year"
            />
          </Field>

          <Field label="Order Date" htmlFor="orderDate">
            <input
              id="orderDate"
              type="date"
              className={inputClass}
              value={data.orderDate}
              onChange={(e) => onChange("orderDate", e.target.value)}
            />
          </Field>

          <Field
            label="Non-Renewal Notice (days)"
            htmlFor="nonRenewalNoticeDays"
          >
            <input
              id="nonRenewalNoticeDays"
              type="text"
              className={inputClass}
              value={data.nonRenewalNoticeDays}
              onChange={(e) => onChange("nonRenewalNoticeDays", e.target.value)}
              placeholder="e.g. 30"
            />
          </Field>

          <Field label="Permitted Uses" htmlFor="permittedUses">
            <textarea
              id="permittedUses"
              rows={3}
              className={textareaClass}
              value={data.permittedUses}
              onChange={(e) => onChange("permittedUses", e.target.value)}
              placeholder="Describe the permitted uses of the software"
            />
          </Field>

          <Field label="License Limits" htmlFor="licenseLimits">
            <input
              id="licenseLimits"
              type="text"
              className={inputClass}
              value={data.licenseLimits}
              onChange={(e) => onChange("licenseLimits", e.target.value)}
              placeholder="e.g. 50 seats"
            />
          </Field>

          <Field label="Warranty Period" htmlFor="warrantyPeriod">
            <input
              id="warrantyPeriod"
              type="text"
              className={inputClass}
              value={data.warrantyPeriod}
              onChange={(e) => onChange("warrantyPeriod", e.target.value)}
              placeholder="e.g. 90 days from delivery"
            />
          </Field>

          <fieldset>
            <legend className={legendClass}>Payment Process</legend>
            <div className="space-y-1.5 mt-1">
              {(
                Object.entries(PAYMENT_PROCESS_LABELS) as Array<
                  [SoftwareLicenseFormData["paymentProcess"], string]
                >
              ).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentProcess"
                    value={value}
                    checked={data.paymentProcess === value}
                    onChange={() => onChange("paymentProcess", value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Field label="Fees" htmlFor="fees">
            <input
              id="fees"
              type="text"
              className={inputClass}
              value={data.fees}
              onChange={(e) => onChange("fees", e.target.value)}
              placeholder="e.g. $10,000/year"
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
              placeholder="e.g. Acme Software Inc."
            />
          </Field>

          <Field label="Notice Address" htmlFor="providerNoticeAddress">
            <input
              id="providerNoticeAddress"
              type="text"
              className={inputClass}
              value={data.providerNoticeAddress}
              onChange={(e) => onChange("providerNoticeAddress", e.target.value)}
              placeholder="e.g. legal@acme.com"
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
              onChange={(e) =>
                onChange("customerNoticeAddress", e.target.value)
              }
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
          Opens browser print dialog — choose &ldquo;Save as PDF&rdquo;
        </p>
      </div>
    </div>
  );
}
