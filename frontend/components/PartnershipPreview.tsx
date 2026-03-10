"use client";

import { PartnershipFormData } from "@/lib/partnership-fields";

interface Props {
  data: PartnershipFormData;
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

export default function PartnershipPreview({ data }: Props) {
  return (
    <div
      id="partnership-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Partnership Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper Partnership Agreement Standard Terms Version 1.0
        </p>
      </div>

      {/* Cover Page */}
      <div className="border border-slate-300 rounded-lg p-6 mb-8 bg-slate-50">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-700 mb-4 text-center">
          Cover Page
        </h2>

        <table className="w-full text-sm">
          <tbody>
            <CoverRow label="Company 1">
              <F value={data.company1} label="Company 1" />
            </CoverRow>
            <CoverRow label="Company 2">
              <F value={data.company2} label="Company 2" />
            </CoverRow>
            <CoverRow label="Effective Date">
              <F value={formatDate(data.effectiveDate)} label="Effective Date" />
            </CoverRow>
            <CoverRow label="End Date">
              <F value={formatDate(data.endDate)} label="End Date" />
            </CoverRow>
            <CoverRow label="Partnership Purpose">
              <F value={data.partnershipPurpose} label="Partnership Purpose" />
            </CoverRow>
            <CoverRow label="Fees">
              <F value={data.fees} label="Fees" />
            </CoverRow>
            <CoverRow label="Payment Schedule">
              <F value={data.paymentSchedule} label="Payment Schedule" />
            </CoverRow>
            <CoverRow label="Territory">
              <F value={data.territory} label="Territory" />
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
            <CoverRow label="Company 1 Notice Address">
              <F value={data.company1NoticeAddress} label="Company 1 Notice Address" />
            </CoverRow>
            <CoverRow label="Company 2 Notice Address">
              <F value={data.company2NoticeAddress} label="Company 2 Notice Address" />
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
          <strong>1. Partnership Overview.</strong> This Partnership Agreement
          (&ldquo;<strong>Agreement</strong>&rdquo;) is entered into between{" "}
          <F value={data.company1} label="Company 1" /> and{" "}
          <F value={data.company2} label="Company 2" /> (each a &ldquo;
          <strong>Party</strong>&rdquo; and together the &ldquo;
          <strong>Parties</strong>&rdquo;) for the purpose of{" "}
          <F value={data.partnershipPurpose} label="Partnership Purpose" />.
          Each Party agrees to use commercially reasonable efforts to fulfill
          its mutual obligations under this Agreement and to act in good faith
          to further the purpose of this partnership.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Payment &amp; Fees.</strong> Fees of{" "}
          <F value={data.fees} label="Fees" /> apply as described in this
          Agreement, payable on a{" "}
          <F value={data.paymentSchedule} label="Payment Schedule" /> basis.
          All Fees are in U.S. Dollars and are exclusive of taxes unless
          specified otherwise. Each Party is responsible for all applicable
          duties, taxes, and levies arising from its activities under this
          Agreement. If a Party has a good-faith disagreement about Fees
          charged, it must notify the other Party before payment is due, and
          the Parties will work together to resolve the dispute within 15
          business days.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Trademark License.</strong> Each Party grants the other a
          non-exclusive, non-transferable, royalty-free license to use its
          trademarks, logos, and brand elements solely in connection with the
          partnership activities within the{" "}
          <F value={data.territory} label="Territory" />. All use of a
          Party&apos;s trademarks must comply with that Party&apos;s brand
          guidelines. Neither Party will alter, modify, or create derivative
          works of the other Party&apos;s brand elements without prior written
          consent. All goodwill arising from use of a Party&apos;s trademarks
          inures to the benefit of the trademark owner.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Privacy.</strong> Each Party will comply with all
          applicable data protection laws and regulations in connection with
          the partnership activities. Before sharing Personal Data, the Parties
          will enter into appropriate data processing arrangements. Each Party
          will implement and maintain reasonable security measures to protect
          any Personal Data received from the other Party.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Term &amp; Termination.</strong> This Agreement commences
          on{" "}
          <F value={formatDate(data.effectiveDate)} label="Effective Date" />{" "}
          and continues until{" "}
          <F value={formatDate(data.endDate)} label="End Date" />, unless
          earlier terminated. Either Party may terminate this Agreement for any
          or no reason upon 30 days written notice to the other Party. Either
          Party may terminate immediately if the other Party materially
          breaches this Agreement and fails to cure such breach within 30 days
          of receiving written notice. Upon termination, each Party will
          promptly return or destroy the other Party&apos;s Confidential
          Information.
        </p>

        <p className="text-sm mb-4">
          <strong>6. Confidentiality.</strong> Each Party (as &ldquo;Receiving
          Party&rdquo;) will not use or disclose the other Party&apos;s (as
          &ldquo;Disclosing Party&rdquo;) Confidential Information except as
          authorized by this Agreement. The Receiving Party will protect
          Confidential Information using at least the same protections it uses
          for its own similar information but no less than a reasonable
          standard of care. Confidential Information excludes information that
          was publicly known, independently developed, or rightfully obtained
          from a third party without restrictions.
        </p>

        <p className="text-sm mb-4">
          <strong>7. Indemnification.</strong> Each Party will indemnify,
          defend, and hold harmless the other Party from and against any
          third-party claims, damages, costs, and expenses (including
          reasonable attorneys&apos; fees) arising from: (a) the indemnifying
          Party&apos;s breach of this Agreement; (b) the indemnifying
          Party&apos;s negligence or willful misconduct; or (c) the
          indemnifying Party&apos;s violation of applicable laws. The
          indemnifying Party has sole control over defense and settlement, and
          the indemnified Party must provide prompt notice and reasonable
          assistance.
        </p>

        <p className="text-sm mb-4">
          <strong>8. Limitation of Liability.</strong> EXCEPT FOR A
          PARTY&apos;S INDEMNIFICATION OBLIGATIONS, NEITHER PARTY WILL BE
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR REVENUES, EVEN IF
          ADVISED OF THE POSSIBILITY IN ADVANCE. EACH PARTY&apos;S TOTAL
          CUMULATIVE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO
          THIS AGREEMENT WILL NOT EXCEED THE TOTAL FEES PAID OR PAYABLE UNDER
          THIS AGREEMENT DURING THE 12 MONTHS PRECEDING THE CLAIM.
        </p>

        <p className="text-sm mb-4">
          <strong>9. General Terms.</strong> This Agreement constitutes the
          entire agreement between the Parties and supersedes all prior
          understandings, agreements, representations, and warranties regarding
          its subject matter. Any modification must be in writing and signed by
          both Parties. The laws of the State of{" "}
          <F value={data.governingLaw} label="Governing Law" /> will govern
          this Agreement without regard to conflict of laws provisions. Legal
          proceedings must be brought in the courts located in{" "}
          <F value={data.chosenCourts} label="Chosen Courts" />. Neither Party
          may assign this Agreement without prior written consent, except in
          connection with a merger, reorganization, or sale of all or
          substantially all its assets. Notices must be sent to the Notice
          Addresses specified in this Agreement and are deemed delivered on
          receipt. This Agreement may be executed in counterparts, including
          electronic copies, each of which is deemed an original and which
          together form the same agreement.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Partnership Agreement{" "}
          <a
            href="https://commonpaper.com/standards/partnership-agreement/1.0/"
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
