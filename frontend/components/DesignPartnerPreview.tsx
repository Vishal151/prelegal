"use client";

import { DesignPartnerFormData } from "@/lib/design-partner-fields";

interface Props {
  data: DesignPartnerFormData;
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

export default function DesignPartnerPreview({ data }: Props) {
  return (
    <div
      id="design-partner-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Design Partner Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper Design Partner Agreement Standard Terms
          Version 1.0
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
            <CoverRow label="Partner">
              <F value={data.partnerCompany} label="Partner Company" />
            </CoverRow>
            <CoverRow label="Product">
              <F value={data.product} label="Product" />
            </CoverRow>
            <CoverRow label="Effective Date">
              <F value={formatDate(data.effectiveDate)} label="Effective Date" />
            </CoverRow>
            <CoverRow label="Term">
              <F value={data.term} label="Term" />
            </CoverRow>
            <CoverRow label="Program Description">
              <F value={data.programDescription} label="Program Description" />
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
            <CoverRow label="Provider Notice Address">
              <F value={data.providerNoticeAddress} label="Provider Notice Address" />
            </CoverRow>
            <CoverRow label="Partner Notice Address">
              <F value={data.partnerNoticeAddress} label="Partner Notice Address" />
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
          <strong>1. Design Partner Overview.</strong>
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>1.1 Product Access.</strong>{" "}
          <F value={data.partnerCompany} label="Partner" /> would like to be one
          of the first users of the{" "}
          <F value={data.product} label="Product" />. During the Term,{" "}
          <F value={data.partnerCompany} label="Partner" /> will have early
          access to the Product for its internal business purposes and to give
          Feedback to <F value={data.providerCompany} label="Provider" /> and
          participate in the Program, so long as{" "}
          <F value={data.partnerCompany} label="Partner" /> complies with the
          terms of this Agreement.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>1.2 Program and Feedback.</strong> The purpose of the Program
          is for <F value={data.providerCompany} label="Provider" /> to develop,
          build, and improve the Product for general use by all of{" "}
          <F value={data.providerCompany} label="Provider" />&apos;s customers
          or users. <F value={data.partnerCompany} label="Partner" /> will give
          Feedback to <F value={data.providerCompany} label="Provider" /> on a
          mutually agreed schedule and will participate in the Program.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>1.3 Product Improvement.</strong>{" "}
          <F value={data.providerCompany} label="Provider" /> will develop and
          improve the Product and may use all Feedback and insight about the
          Product from the Program freely without any restriction or obligation.{" "}
          <F value={data.partnerCompany} label="Partner" /> will not give any
          Feedback that <F value={data.providerCompany} label="Provider" />{" "}
          cannot use in this manner or for the purpose.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Fees and Costs.</strong>{" "}
          <F value={data.partnerCompany} label="Partner" /> will pay{" "}
          <F value={data.providerCompany} label="Provider" /> the Fees, if any.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Term &amp; Termination.</strong>
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>3.1 Agreement Term.</strong> This Agreement will start on the{" "}
          <F value={formatDate(data.effectiveDate)} label="Effective Date" /> and
          continue for the <F value={data.term} label="Term" />.{" "}
          <F value={data.providerCompany} label="Provider" /> and{" "}
          <F value={data.partnerCompany} label="Partner" /> may mutually agree to
          extend the Term, including by email communication.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>3.2 Termination.</strong> Either party may terminate this
          Agreement for any or no reason. To terminate this Agreement, the
          terminating party must notify the other party about termination by
          giving the other party 30 days advance notice.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>3.3 Effect of Termination.</strong> Upon expiration or
          termination of the Agreement: (a){" "}
          <F value={data.partnerCompany} label="Partner" /> will no longer have
          any right to access or use the Product.{" "}
          <F value={data.partnerCompany} label="Partner" /> will no longer be
          required to provide Feedback or participate in the Program under the
          Agreement. (b) Each Recipient will return or destroy Discloser&apos;s
          Confidential Information in its possession or control.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>3.4 Survival.</strong> The following sections will survive
          expiration or termination of the Agreement: Section 1.3 (Product
          Improvement), Section 3.3 (Effect of Termination), Section 3.4
          (Survival), Section 4 (Disclaimer), Section 5 (Confidentiality),
          Section 6 (Intellectual Property), and Section 7 (General Terms).
        </p>

        <p className="text-sm mb-4">
          <strong>4. Disclaimer.</strong>{" "}
          <F value={data.providerCompany} label="Provider" /> and{" "}
          <F value={data.partnerCompany} label="Partner" /> each disclaim all
          warranties, whether express or implied, including the implied
          warranties of merchantability, fitness for a particular purpose, title,
          and non-infringement. These disclaimers apply to the maximum extent
          permitted by Applicable Laws.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Confidentiality.</strong>
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>5.1 Non-Use and Non-Disclosure.</strong> Unless otherwise
          authorized in the Agreement, Recipient will (a) only use
          Discloser&apos;s Confidential Information to fulfill its obligations or
          exercise its rights under this Agreement; and (b) not disclose
          Discloser&apos;s Confidential Information to anyone else. In addition,
          Recipient will protect Discloser&apos;s Confidential Information using
          at least the same protections Recipient uses for its own similar
          information but no less than a reasonable standard of care.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>5.2 Exclusions.</strong> Confidential Information does not
          include information that (a) Recipient knew without any obligation of
          confidentiality before disclosure by Discloser; (b) is or becomes
          publicly known and generally available through no fault of Recipient;
          (c) Recipient receives under no obligation of confidentiality from
          someone else who is authorized to make the disclosure; or (d) Recipient
          independently developed without use of or reference to Discloser&apos;s
          Confidential Information.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>5.3 Required Disclosures.</strong> Recipient may disclose
          Discloser&apos;s Confidential Information to the extent required by
          Applicable Laws if, unless prohibited by Applicable Laws, Recipient
          provides the Discloser reasonable advance notice of the required
          disclosure and reasonably cooperates, at the Discloser&apos;s expense,
          with the Discloser&apos;s efforts to obtain confidential treatment for
          the Confidential Information.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>5.4 Permitted Disclosures.</strong> Recipient may disclose
          Discloser&apos;s Confidential Information to employees, advisors,
          contractors, and representatives who each have a need to know the
          Confidential Information, but only if the person or entity is bound by
          confidentiality obligations at least as protective as those in this
          Section 5 and Recipient remains responsible for everyone&apos;s
          compliance with the terms of this Section 5.
        </p>

        <p className="text-sm mb-4">
          <strong>6. Intellectual Property.</strong>
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>6.1 Reservation of Rights.</strong> Except for the limited
          license to access the Product in Section 1.1 (Product Access),{" "}
          <F value={data.providerCompany} label="Provider" /> retains all right,
          title, and interest in and to the Product, including any aspects,
          features, or functionality created in response to Feedback or{" "}
          <F value={data.partnerCompany} label="Partner" />&apos;s participation
          in the Program, whether developed before or after the Effective Date.
          Each Discloser retains all right, title, and interest in and to its
          Confidential Information.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>6.2 Ownership.</strong>{" "}
          <F value={data.providerCompany} label="Provider" /> owns all Feedback.{" "}
          <F value={data.partnerCompany} label="Partner" /> hereby assigns to{" "}
          <F value={data.providerCompany} label="Provider" /> all its right,
          title, and interest in and to Feedback and will reasonably cooperate
          with <F value={data.providerCompany} label="Provider" /> as needed to
          establish, prove, or defend{" "}
          <F value={data.providerCompany} label="Provider" />&apos;s ownership of
          Feedback.
        </p>

        <p className="text-sm mb-4">
          <strong>7. General Terms.</strong>
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.1 Entire Agreement.</strong> This Agreement is the only
          agreement between the parties about its subject and this Agreement
          supersedes all prior or contemporaneous statements (whether in writing
          or not) about its subject.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.2 Modifications, Severability, and Waiver.</strong> Any
          waiver, modification, or change to the Agreement must be in writing and
          signed or electronically accepted by each party. If any term of this
          Agreement is determined to be invalid or unenforceable by a relevant
          court or governing body, the remaining terms of this Agreement will
          remain in full force and effect.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.3 Governing Law and Chosen Courts.</strong> The laws of the
          State of <F value={data.governingLaw} label="Governing Law" /> will
          govern all interpretations and disputes about this Agreement, without
          regard to its conflict of laws provisions. The parties will bring any
          legal suit, action, or proceeding about this Agreement in the courts
          located in <F value={data.chosenCourts} label="Chosen Courts" /> and
          each party irrevocably submits to the exclusive jurisdiction of such
          courts.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.4 Injunctive Relief.</strong> Despite Section 7.3 (Governing
          Law and Chosen Courts), a breach of Section 5 (Confidentiality) or the
          violation of a party&apos;s intellectual property rights may cause
          irreparable harm for which monetary damages cannot adequately
          compensate. As a result, upon the actual or threatened breach, the
          non-breaching party may seek appropriate equitable relief, including an
          injunction, in any court of competent jurisdiction.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.5 Restrictions.</strong> Except as expressly permitted by
          this Agreement, <F value={data.partnerCompany} label="Partner" /> will
          not (and will not allow anyone else to): (a) reverse engineer,
          decompile, or attempt to discover any source code or underlying ideas
          or algorithms of the Product; (b) provide, sell, transfer, sublicense,
          lend, distribute, rent, or otherwise allow others to access or use the
          Product; (c) remove any proprietary notices or labels; (d) copy,
          modify, or create derivative works of the Product; (e) conduct security
          or vulnerability tests on, interfere with the operation of, cause
          performance degradation of, or circumvent access restrictions of the
          Product; (f) access accounts, information, data, or portions of the
          Product to which{" "}
          <F value={data.partnerCompany} label="Partner" /> does not have
          explicit authorization; (g) use the Product to develop a competing
          service or product; or (h) use the Product with activity prohibited by
          Applicable Laws.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.6 Assignment.</strong> Neither party may assign any rights or
          obligations under this Agreement without the prior written consent of
          the other party. However, either party may assign this Agreement upon
          notice if the assigning party undergoes a merger, change of control,
          reorganization, or sale of all or substantially all its equity,
          business, or assets to which this Agreement relates.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.7 Notices.</strong> Any notice, request, or approval about
          the Agreement must be in writing and sent to the Notice Address.
          Notices will be deemed given (a) upon confirmed delivery if by email,
          registered or certified mail, or personal delivery; or (b) two days
          after mailing if by overnight commercial delivery.
        </p>

        <p className="text-sm mb-4 pl-4">
          <strong>7.8 Independent Contractors.</strong> The parties are
          independent contractors, not agents, partners, or joint venturers.
          Neither party is authorized to bind the other to any liability or
          obligation.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Design Partner Agreement{" "}
          <a
            href="https://commonpaper.com/standards/design-partner-agreement/1.0/"
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
