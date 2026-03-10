"use client";

import { SlaFormData } from "@/lib/sla-fields";

interface Props {
  data: SlaFormData;
}

/** Renders a filled field value, or a dashed placeholder when empty */
function F({ value, label }: { value: string; label: string }) {
  if (value) {
    return <span className="font-semibold text-slate-900">{value}</span>;
  }
  return (
    <span className="inline-block border-b border-dashed border-slate-400 min-w-28 text-slate-400 italic text-sm align-bottom px-1">
      {label}
    </span>
  );
}

function CoverRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr className="border-b border-slate-200 last:border-0">
      <td className="py-2 pr-4 font-semibold text-slate-600 w-48 align-top">
        {label}
      </td>
      <td className="py-2 text-slate-800">{children}</td>
    </tr>
  );
}

export default function SlaPreview({ data }: Props) {
  return (
    <div
      id="sla-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Service Level Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper SLA Standard Terms Version 1.0
        </p>
      </div>

      {/* Cover Page */}
      <div className="border border-slate-300 rounded-lg p-6 mb-8 bg-slate-50">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-700 mb-4 text-center">
          Cover Page
        </h2>

        <table className="w-full text-sm">
          <tbody>
            <CoverRow label="Provider">
              <F value={data.providerCompany} label="Provider Company" />
            </CoverRow>
            <CoverRow label="Customer">
              <F value={data.customerCompany} label="Customer Company" />
            </CoverRow>
            <CoverRow label="Cloud Service">
              <F value={data.cloudService} label="Cloud Service" />
            </CoverRow>
            <CoverRow label="Target Uptime">
              <F value={data.targetUptime} label="Target Uptime" />
            </CoverRow>
            <CoverRow label="Target Response Time">
              <F value={data.targetResponseTime} label="Target Response Time" />
            </CoverRow>
            <CoverRow label="Support Channel">
              <F value={data.supportChannel} label="Support Channel" />
            </CoverRow>
            <CoverRow label="Uptime Credit">
              <F value={data.uptimeCreditPercent} label="Uptime Credit %" />
            </CoverRow>
            <CoverRow label="Response Time Credit">
              <F value={data.responseTimeCreditPercent} label="Response Time Credit %" />
            </CoverRow>
            <CoverRow label="Max Credit Cap">
              <F value={data.maxCreditPercent} label="Max Credit %" />
            </CoverRow>
          </tbody>
        </table>
      </div>

      {/* Standard Terms */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-700 mb-4 text-center">
          Standard Terms
        </h2>

        <p className="text-sm mb-4">
          <strong>1. Uptime.</strong> <F value={data.providerCompany} label="Provider" /> will
          use commercially reasonable efforts to make the{" "}
          <F value={data.cloudService} label="Cloud Service" /> available with a target uptime
          of <F value={data.targetUptime} label="Target Uptime" /> measured on a monthly basis,
          excluding scheduled maintenance windows communicated at least 48 hours in advance.
          Uptime is calculated as the total number of minutes in the measurement period minus
          downtime minutes, divided by the total number of minutes in the measurement period.
          If uptime falls below the target in any given month,{" "}
          <F value={data.customerCompany} label="Customer" /> may request service credits as
          described in Section 3.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Response Time.</strong> <F value={data.providerCompany} label="Provider" /> will
          respond to support requests from{" "}
          <F value={data.customerCompany} label="Customer" /> within{" "}
          <F value={data.targetResponseTime} label="Target Response Time" /> of receipt via the
          designated support channel ({<F value={data.supportChannel} label="Support Channel" />}).
          Response time is measured from when the support request is received to when{" "}
          <F value={data.providerCompany} label="Provider" /> provides an initial substantive
          acknowledgment. Priority classifications and escalation procedures are as agreed
          between the parties.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Service Credits.</strong> If{" "}
          <F value={data.providerCompany} label="Provider" /> fails to meet the target uptime
          in any calendar month, <F value={data.customerCompany} label="Customer" /> will be
          entitled to a service credit of{" "}
          <F value={data.uptimeCreditPercent} label="Uptime Credit %" /> of the monthly fees
          for each percentage point (or fraction thereof) below the target. If{" "}
          <F value={data.providerCompany} label="Provider" /> fails to meet the target response
          time for more than 10% of support requests in any calendar month,{" "}
          <F value={data.customerCompany} label="Customer" /> will be entitled to an additional
          service credit of{" "}
          <F value={data.responseTimeCreditPercent} label="Response Time Credit %" /> of the
          monthly fees. Total service credits in any calendar month shall not exceed{" "}
          <F value={data.maxCreditPercent} label="Max Credit %" /> of the monthly fees for
          that month. Service credits are applied against future invoices and are{" "}
          <F value={data.customerCompany} label="Customer" />&apos;s sole and exclusive remedy
          for failure to meet the service levels described herein.
        </p>

        <p className="text-sm mb-4">
          <strong>4. General.</strong> <F value={data.customerCompany} label="Customer" /> must
          request service credits in writing within 30 days of the end of the month in which
          the service level was not met. <F value={data.providerCompany} label="Provider" /> will
          verify the claim and apply valid credits within the following billing cycle. Service
          levels do not apply during force majeure events, scheduled maintenance, or issues
          caused by <F value={data.customerCompany} label="Customer" />&apos;s systems,
          third-party services, or use of the{" "}
          <F value={data.cloudService} label="Cloud Service" /> in violation of the applicable
          agreement. This SLA is subject to the terms and conditions of the Cloud Service
          Agreement between the parties.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Service Level Agreement{" "}
          <a
            href="https://commonpaper.com/standards/sla/1.0/"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Version 1.0
          </a>{" "}
          free to use under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY 4.0
          </a>
          .
        </p>
      </div>
    </div>
  );
}
