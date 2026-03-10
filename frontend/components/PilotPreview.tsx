"use client";

import { PilotFormData } from "@/lib/pilot-fields";

interface Props {
  data: PilotFormData;
}

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

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

function SigRow({
  label,
  value,
  blank,
}: {
  label: string;
  value: string;
  blank?: boolean;
}) {
  return (
    <div className="flex gap-1">
      <span className="text-slate-500 shrink-0">{label}:</span>
      {blank ? (
        <span className="flex-1 border-b border-slate-400">&nbsp;</span>
      ) : value ? (
        <span className="font-medium text-slate-900">{value}</span>
      ) : (
        <span className="flex-1 border-b border-dashed border-slate-300 text-slate-400 italic">
          &nbsp;
        </span>
      )}
    </div>
  );
}

export default function PilotPreview({ data }: Props) {
  const provider = data.providerCompany;
  const customer = data.customerCompany;

  return (
    <div
      id="pilot-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Pilot Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper Pilot Agreement Standard Terms
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
              <F value={provider} label="Provider" />
            </CoverRow>
            <CoverRow label="Customer">
              <F value={customer} label="Customer" />
            </CoverRow>
            <CoverRow label="Product">
              <F value={data.product} label="Product" />
            </CoverRow>
            <CoverRow label="Effective Date">
              <F value={formatDate(data.effectiveDate)} label="Effective Date" />
            </CoverRow>
            <CoverRow label="Pilot Period">
              <F value={data.pilotPeriod} label="Pilot Period" />
            </CoverRow>
            <CoverRow label="Evaluation Purposes">
              <F value={data.evaluationPurposes} label="Evaluation Purposes" />
            </CoverRow>
            <CoverRow label="Fees">
              <F value={data.fees} label="Fees" />
            </CoverRow>
            <CoverRow label="Governing Law">
              <span>
                State of{" "}
                <F value={data.governingLaw} label="Governing Law" />
              </span>
            </CoverRow>
            <CoverRow label="Chosen Courts">
              <span>
                Courts located in{" "}
                <F value={data.chosenCourts} label="Chosen Courts" />
              </span>
            </CoverRow>
          </tbody>
        </table>

        {/* Signature Blocks */}
        <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-300">
          <div className="text-sm">
            <p className="font-bold text-slate-700 mb-2">Provider</p>
            <div className="space-y-2">
              <SigRow label="Company" value={provider} />
              <SigRow label="Signature" value="" blank />
              <SigRow label="Notice Address" value={data.providerNoticeAddress} />
            </div>
          </div>
          <div className="text-sm">
            <p className="font-bold text-slate-700 mb-2">Customer</p>
            <div className="space-y-2">
              <SigRow label="Company" value={customer} />
              <SigRow label="Signature" value="" blank />
              <SigRow label="Notice Address" value={data.customerNoticeAddress} />
            </div>
          </div>
        </div>
      </div>

      {/* Standard Terms */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-700 mb-4 text-center">
          Standard Terms
        </h2>

        <p className="text-sm mb-4">
          <strong>1. Pilot Access.</strong> During the Pilot Period,{" "}
          <F value={provider} label="Provider" /> (&ldquo;
          <strong>Provider</strong>&rdquo;) grants{" "}
          <F value={customer} label="Customer" /> (&ldquo;
          <strong>Customer</strong>&rdquo;) a limited, non-exclusive,
          non-transferable right to access and use the{" "}
          <F value={data.product} label="Product" /> (&ldquo;
          <strong>Product</strong>&rdquo;) solely for internal evaluation
          purposes as described on the Cover Page. Customer shall not use the
          Product in a production environment or for any purpose other than
          evaluation. Customer shall not sublicense, resell, or make the Product
          available to any third party.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Term & Termination.</strong> This Agreement commences on
          the <F value={formatDate(data.effectiveDate)} label="Effective Date" />{" "}
          and continues for the Pilot Period of{" "}
          <F value={data.pilotPeriod} label="Pilot Period" />, unless
          terminated earlier. Either party may terminate this Agreement for any
          reason upon written notice to the other party. Upon termination,
          Customer shall cease all use of the Product and return or destroy any
          Provider materials in its possession.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Representations.</strong> Each party represents that it has
          the legal power and authority to enter into this Agreement. Provider
          represents that the Product will perform materially as described in any
          documentation provided to Customer. Customer represents that it will
          use the Product in compliance with all applicable laws and regulations.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Disclaimer.</strong> EXCEPT AS EXPRESSLY SET FORTH HEREIN,
          THE PRODUCT IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE&rdquo;, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS,
          IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
          NON-INFRINGEMENT.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Limitation of Liability.</strong> NEITHER PARTY SHALL BE
          LIABLE TO THE OTHER FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS
          AGREEMENT, REGARDLESS OF WHETHER SUCH DAMAGES ARE BASED ON WARRANTY,
          CONTRACT, TORT, STATUTE, OR ANY OTHER LEGAL THEORY. EACH PARTY&apos;S
          TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE
          FEES PAID OR PAYABLE UNDER THIS AGREEMENT.
        </p>

        <p className="text-sm mb-4">
          <strong>6. Confidentiality.</strong> Each party agrees that all
          information disclosed by the other party in connection with this
          Agreement that is identified as confidential or that reasonably should
          be understood to be confidential shall be treated as confidential
          information. Each party shall use the other party&apos;s confidential
          information solely for purposes of this Agreement and shall not
          disclose such information to any third party without the disclosing
          party&apos;s prior written consent.
        </p>

        <p className="text-sm mb-4">
          <strong>7. General Terms.</strong> This Agreement constitutes the
          entire agreement between the parties with respect to its subject
          matter and supersedes all prior or contemporaneous agreements. This
          Agreement is governed by the laws of the State of{" "}
          <F value={data.governingLaw} label="Governing Law" />, without regard
          to conflict of laws principles. Any legal action relating to this
          Agreement shall be brought in the courts located in{" "}
          <F value={data.chosenCourts} label="Chosen Courts" />. Neither party
          may assign this Agreement without the prior written consent of the
          other party. This Agreement may be executed in counterparts, each of
          which is deemed an original.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Pilot Agreement free to use under{" "}
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
