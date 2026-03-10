"use client";

import {
  BaaFormData,
  OFFSHORING_LABELS,
  DEIDENTIFICATION_LABELS,
  AGGREGATION_LABELS,
} from "@/lib/baa-fields";

interface Props {
  data: BaaFormData;
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

export default function BaaPreview({ data }: Props) {
  const provider = data.providerCompany;
  const company = data.companyName;

  return (
    <div
      id="baa-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Business Associate Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          HIPAA-Compliant Business Associate Agreement
        </p>
      </div>

      {/* Cover Page */}
      <div className="border border-slate-300 rounded-lg p-6 mb-8 bg-slate-50">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-700 mb-4 text-center">
          Cover Page
        </h2>

        <table className="w-full text-sm">
          <tbody>
            <CoverRow label="Business Associate">
              <F value={provider} label="Business Associate" />
            </CoverRow>
            <CoverRow label="Covered Entity">
              <F value={company} label="Covered Entity" />
            </CoverRow>
            <CoverRow label="Effective Date">
              <F value={formatDate(data.effectiveDate)} label="Effective Date" />
            </CoverRow>
            <CoverRow label="Services Description">
              <F value={data.servicesDescription} label="Services Description" />
            </CoverRow>
            <CoverRow label="Breach Notification">
              <span>
                Within{" "}
                <F value={data.breachNotificationDays} label="days" />{" "}
                days of discovery
              </span>
            </CoverRow>
            <CoverRow label="Offshoring">
              <span className="font-semibold">
                {OFFSHORING_LABELS[data.offshoringAllowed]}
              </span>
            </CoverRow>
            <CoverRow label="De-identification">
              <span className="font-semibold">
                {DEIDENTIFICATION_LABELS[data.deidentificationAllowed]}
              </span>
            </CoverRow>
            <CoverRow label="Aggregation">
              <span className="font-semibold">
                {AGGREGATION_LABELS[data.aggregationAllowed]}
              </span>
            </CoverRow>
          </tbody>
        </table>

        {/* Signature Blocks */}
        <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-300">
          <div className="text-sm">
            <p className="font-bold text-slate-700 mb-2">Business Associate</p>
            <div className="space-y-2">
              <SigRow label="Company" value={provider} />
              <SigRow label="Signature" value="" blank />
              <SigRow label="Notice Address" value={data.providerNoticeAddress} />
            </div>
          </div>
          <div className="text-sm">
            <p className="font-bold text-slate-700 mb-2">Covered Entity</p>
            <div className="space-y-2">
              <SigRow label="Company" value={company} />
              <SigRow label="Signature" value="" blank />
              <SigRow label="Notice Address" value={data.companyNoticeAddress} />
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
          <strong>1. Business Associate Obligations.</strong>{" "}
          <F value={provider} label="Business Associate" /> (&ldquo;
          <strong>Business Associate</strong>&rdquo;) agrees to: (a) not use or
          disclose Protected Health Information (&ldquo;<strong>PHI</strong>
          &rdquo;) other than as permitted or required by this Agreement or as
          required by law; (b) use appropriate safeguards to prevent use or
          disclosure of PHI other than as provided by this Agreement, including
          implementing administrative, physical, and technical safeguards that
          reasonably and appropriately protect the confidentiality, integrity,
          and availability of electronic PHI; (c) report to{" "}
          <F value={company} label="Covered Entity" /> any use or disclosure
          of PHI not provided for by this Agreement of which it becomes aware;
          (d) ensure that any subcontractors that create, receive, maintain, or
          transmit PHI on behalf of Business Associate agree to the same
          restrictions and conditions that apply to Business Associate under
          this Agreement; and (e) make available PHI in accordance with the
          individual&apos;s rights as required under HIPAA.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Company Obligations.</strong>{" "}
          <F value={company} label="Covered Entity" /> (&ldquo;
          <strong>Company</strong>&rdquo;) shall: (a) notify Business Associate
          of any limitations in its notice of privacy practices that may affect
          Business Associate&apos;s use or disclosure of PHI; (b) notify
          Business Associate of any changes in, or revocation of, the
          permission by an individual to use or disclose their PHI, to the
          extent that such changes may affect Business Associate&apos;s use or
          disclosure of PHI; and (c) notify Business Associate of any
          restriction on the use or disclosure of PHI that Company has agreed
          to in accordance with HIPAA.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Data Rights & Restrictions.</strong> Business Associate
          shall not use or disclose PHI in a manner that would violate HIPAA if
          done by Company.{" "}
          {data.offshoringAllowed === "restricted" ? (
            <>
              Business Associate shall not process PHI outside of the United
              States without the prior written consent of Company.
            </>
          ) : (
            <>
              Business Associate may process PHI outside of the United States
              subject to applicable safeguards.
            </>
          )}{" "}
          {data.deidentificationAllowed === "allowed" ? (
            <>
              Business Associate may de-identify PHI in accordance with HIPAA
              requirements.
            </>
          ) : (
            <>
              Business Associate shall not de-identify PHI without the prior
              written consent of Company.
            </>
          )}{" "}
          {data.aggregationAllowed === "allowed" ? (
            <>
              Business Associate may aggregate PHI with data from other sources
              for permitted purposes.
            </>
          ) : (
            <>
              Business Associate shall not aggregate PHI with data from other
              sources without the prior written consent of Company.
            </>
          )}
        </p>

        <p className="text-sm mb-4">
          <strong>4. Breach Notification.</strong> Business Associate shall
          report to Company any Breach of Unsecured PHI within{" "}
          <F value={data.breachNotificationDays} label="notification days" />{" "}
          days of discovery. Such report shall include, to the extent possible:
          (a) identification of each individual whose Unsecured PHI has been, or
          is reasonably believed to have been, accessed, acquired, used, or
          disclosed during the Breach; (b) a description of the nature of the
          Breach; (c) the date of discovery and date of the Breach; (d) a
          description of the types of Unsecured PHI involved; and (e) any steps
          Business Associate recommends that individuals take to protect
          themselves from potential harm.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Term & Termination.</strong> This Agreement commences on
          the <F value={formatDate(data.effectiveDate)} label="Effective Date" />{" "}
          and remains in effect until all PHI provided by Company to Business
          Associate, or created or received by Business Associate on behalf of
          Company, is destroyed or returned, or the Agreement is terminated.
          Either party may terminate this Agreement if it determines that the
          other party has violated a material term of this Agreement. Upon
          termination, Business Associate shall, if feasible, return or destroy
          all PHI received from Company, or created or received by Business
          Associate on behalf of Company. If return or destruction is not
          feasible, the protections of this Agreement shall extend to such PHI.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Business Associate Agreement free to use under{" "}
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
