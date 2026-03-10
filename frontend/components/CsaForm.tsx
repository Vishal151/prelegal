"use client";

import { CsaFormData, PAYMENT_PROCESS_LABELS } from "@/lib/csa-fields";
import { inputClass, legendClass, Section, Field } from "@/lib/form-helpers";

interface Props {
  data: CsaFormData;
  onChange: <K extends keyof CsaFormData>(field: K, value: CsaFormData[K]) => void;
  onDownload: () => void;
}

export default function CsaForm({ data, onChange, onDownload }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800">
          Agreement Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in the fields to populate the Cloud Service Agreement
        </p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Section title="Agreement Terms">
          <Field label="Cloud Service" htmlFor="cloudService">
            <input
              id="cloudService"
              type="text"
              className={inputClass}
              value={data.cloudService}
              onChange={(e) => onChange("cloudService", e.target.value)}
              placeholder="e.g. Acme Cloud Platform"
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

          <Field label="Non-Renewal Notice (Days)" htmlFor="nonRenewalNoticeDays">
            <input
              id="nonRenewalNoticeDays"
              type="text"
              className={inputClass}
              value={data.nonRenewalNoticeDays}
              onChange={(e) => onChange("nonRenewalNoticeDays", e.target.value)}
              placeholder="e.g. 30"
            />
          </Field>

          <Field label="Technical Support" htmlFor="technicalSupport">
            <input
              id="technicalSupport"
              type="text"
              className={inputClass}
              value={data.technicalSupport}
              onChange={(e) => onChange("technicalSupport", e.target.value)}
              placeholder="e.g. Email support, 9am-5pm EST"
            />
          </Field>

          <fieldset>
            <legend className={legendClass}>Payment Process</legend>
            <div className="space-y-1.5 mt-1">
              {(
                Object.entries(PAYMENT_PROCESS_LABELS) as Array<
                  [CsaFormData["paymentProcess"], string]
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
              placeholder="e.g. $1,000/month"
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
              onChange={(e) => onChange("customerNoticeAddress", e.target.value)}
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
