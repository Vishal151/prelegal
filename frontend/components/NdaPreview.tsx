"use client";

import { NdaFormData } from "@/lib/nda-fields";

interface Props {
  data: NdaFormData;
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

function mndaTermLabel(term: NdaFormData["mndaTerm"]) {
  return term === "1year"
    ? "1 year from the Effective Date"
    : "indefinite, until terminated by either party";
}

function tocLabel(toc: NdaFormData["termOfConfidentiality"]) {
  return toc === "1year" ? "1 year from the Effective Date" : "perpetual";
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NdaPreview({ data }: Props) {
  const p1 = data.party1Company || data.party1Name;
  const p2 = data.party2Company || data.party2Name;

  return (
    <div
      id="nda-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Mutual Non-Disclosure Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper MNDA Standard Terms Version 1.0
        </p>
      </div>

      {/* Cover Page */}
      <div className="border border-slate-300 rounded-lg p-6 mb-8 bg-slate-50">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-700 mb-4 text-center">
          Cover Page
        </h2>

        <table className="w-full text-sm">
          <tbody>
            <CoverRow label="Effective Date">
              <F
                value={formatDate(data.effectiveDate)}
                label="Effective Date"
              />
            </CoverRow>
            <CoverRow label="Purpose">
              <F value={data.purpose} label="Purpose" />
            </CoverRow>
            <CoverRow label="MNDA Term">
              <span className="font-semibold">{mndaTermLabel(data.mndaTerm)}</span>
            </CoverRow>
            <CoverRow label="Term of Confidentiality">
              <span className="font-semibold">{tocLabel(data.termOfConfidentiality)}</span>
            </CoverRow>
            <CoverRow label="Governing Law">
              <span>
                State of{" "}
                <F value={data.governingLaw} label="Governing Law" />
              </span>
            </CoverRow>
            <CoverRow label="Jurisdiction">
              <span>
                Courts located in{" "}
                <F value={data.jurisdiction} label="Jurisdiction" />
              </span>
            </CoverRow>
            <CoverRow label="Modifications to Standard Terms">
              <span className="italic text-slate-500">None</span>
            </CoverRow>
          </tbody>
        </table>

        {/* Signature Blocks */}
        <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-300">
          <SignatureBlock
            party="Party 1"
            company={data.party1Company}
            name={data.party1Name}
            title={data.party1Title}
            address={data.party1Address}
            date={formatDate(data.party1Date)}
          />
          <SignatureBlock
            party="Party 2"
            company={data.party2Company}
            name={data.party2Name}
            title={data.party2Title}
            address={data.party2Address}
            date={formatDate(data.party2Date)}
          />
        </div>
      </div>

      {/* Standard Terms */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-700 mb-4 text-center">
          Standard Terms
        </h2>

        <p className="text-sm mb-4">
          <strong>1. Introduction.</strong> This Mutual Non-Disclosure Agreement
          (which incorporates these Standard Terms and the Cover Page (defined
          below)) (&ldquo;<strong>MNDA</strong>&rdquo;) allows each party
          (&ldquo;<strong>Disclosing Party</strong>&rdquo;) to disclose or make
          available information in connection with the{" "}
          <F value={data.purpose} label="Purpose" /> which (1) the Disclosing
          Party identifies to the receiving party (&ldquo;
          <strong>Receiving Party</strong>&rdquo;) as &ldquo;confidential&rdquo;,
          &ldquo;proprietary&rdquo;, or the like or (2) should be reasonably
          understood as confidential or proprietary due to its nature and the
          circumstances of its disclosure (&ldquo;
          <strong>Confidential Information</strong>&rdquo;). Each party&apos;s
          Confidential Information also includes the existence and status of the
          parties&apos; discussions and information on the Cover Page.
          Confidential Information includes technical or business information,
          product designs or roadmaps, requirements, pricing, security and
          compliance documentation, technology, inventions and know-how. To use
          this MNDA, the parties must complete and sign a cover page
          incorporating these Standard Terms (&ldquo;<strong>Cover Page</strong>
          &rdquo;). {p1 && p2 ? `${p1} and ${p2} are` : "Each party is"}{" "}
          identified on the Cover Page and capitalized terms have the meanings
          given herein or on the Cover Page.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Use and Protection of Confidential Information.</strong>{" "}
          The Receiving Party shall: (a) use Confidential Information solely for
          the <F value={data.purpose} label="Purpose" />; (b) not disclose
          Confidential Information to third parties without the Disclosing
          Party&apos;s prior written approval, except that the Receiving Party
          may disclose Confidential Information to its employees, agents,
          advisors, contractors and other representatives having a reasonable
          need to know for the <F value={data.purpose} label="Purpose" />,
          provided these representatives are bound by confidentiality obligations
          no less protective of the Disclosing Party than the applicable terms in
          this MNDA and the Receiving Party remains responsible for their
          compliance with this MNDA; and (c) protect Confidential Information
          using at least the same protections the Receiving Party uses for its
          own similar information but no less than a reasonable standard of care.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Exceptions.</strong> The Receiving Party&apos;s obligations
          in this MNDA do not apply to information that it can demonstrate: (a)
          is or becomes publicly available through no fault of the Receiving
          Party; (b) it rightfully knew or possessed prior to receipt from the
          Disclosing Party without confidentiality restrictions; (c) it
          rightfully obtained from a third party without confidentiality
          restrictions; or (d) it independently developed without using or
          referencing the Confidential Information.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Disclosures Required by Law.</strong> The Receiving Party
          may disclose Confidential Information to the extent required by law,
          regulation or regulatory authority, subpoena or court order, provided
          (to the extent legally permitted) it provides the Disclosing Party
          reasonable advance notice of the required disclosure and reasonably
          cooperates, at the Disclosing Party&apos;s expense, with the Disclosing
          Party&apos;s efforts to obtain confidential treatment for the
          Confidential Information.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Term and Termination.</strong> This MNDA commences on the{" "}
          <F value={formatDate(data.effectiveDate)} label="Effective Date" /> and
          expires at the end of the{" "}
          <span className="font-semibold">{mndaTermLabel(data.mndaTerm)}</span>.
          Either party may terminate this MNDA for any or no reason upon written
          notice to the other party. The Receiving Party&apos;s obligations
          relating to Confidential Information will survive for{" "}
          <span className="font-semibold">
            {tocLabel(data.termOfConfidentiality)}
          </span>
          , despite any expiration or termination of this MNDA.
        </p>

        <p className="text-sm mb-4">
          <strong>6. Return or Destruction of Confidential Information.</strong>{" "}
          Upon expiration or termination of this MNDA or upon the Disclosing
          Party&apos;s earlier request, the Receiving Party will: (a) cease using
          Confidential Information; (b) promptly after the Disclosing Party&apos;s
          written request, destroy all Confidential Information in the Receiving
          Party&apos;s possession or control or return it to the Disclosing Party;
          and (c) if requested by the Disclosing Party, confirm its compliance
          with these obligations in writing. As an exception to subsection (b),
          the Receiving Party may retain Confidential Information in accordance
          with its standard backup or record retention policies or as required by
          law, but the terms of this MNDA will continue to apply to the retained
          Confidential Information.
        </p>

        <p className="text-sm mb-4">
          <strong>7. Proprietary Rights.</strong> The Disclosing Party retains
          all of its intellectual property and other rights in its Confidential
          Information and its disclosure to the Receiving Party grants no license
          under such rights.
        </p>

        <p className="text-sm mb-4">
          <strong>8. Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS
          PROVIDED &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT WARRANTIES,
          INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS
          FOR A PARTICULAR PURPOSE.
        </p>

        <p className="text-sm mb-4">
          <strong>9. Governing Law and Jurisdiction.</strong> This MNDA and all
          matters relating hereto are governed by, and construed in accordance
          with, the laws of the State of{" "}
          <F value={data.governingLaw} label="Governing Law" />, without regard
          to the conflict of laws provisions of such{" "}
          <F value={data.governingLaw} label="Governing Law" />. Any legal suit,
          action, or proceeding relating to this MNDA must be instituted in the
          federal or state courts located in{" "}
          <F value={data.jurisdiction} label="Jurisdiction" />. Each party
          irrevocably submits to the exclusive jurisdiction of such{" "}
          <F value={data.jurisdiction} label="Jurisdiction" /> in any such suit,
          action, or proceeding.
        </p>

        <p className="text-sm mb-4">
          <strong>10. Equitable Relief.</strong> A breach of this MNDA may cause
          irreparable harm for which monetary damages are an insufficient remedy.
          Upon a breach of this MNDA, the Disclosing Party is entitled to seek
          appropriate equitable relief, including an injunction, in addition to
          its other remedies.
        </p>

        <p className="text-sm mb-4">
          <strong>11. General.</strong> Neither party has an obligation under
          this MNDA to disclose Confidential Information to the other or proceed
          with any proposed transaction. Neither party may assign this MNDA
          without the prior written consent of the other party, except that
          either party may assign this MNDA in connection with a merger,
          reorganization, acquisition or other transfer of all or substantially
          all its assets or voting securities. Any assignment in violation of
          this Section is null and void. This MNDA will bind and inure to the
          benefit of each party&apos;s permitted successors and assigns. Waivers
          must be signed by the waiving party&apos;s authorized representative
          and cannot be implied from conduct. If any provision of this MNDA is
          held unenforceable, it will be limited to the minimum extent necessary
          so the rest of this MNDA remains in effect. This MNDA (including the
          Cover Page) constitutes the entire agreement of the parties with
          respect to its subject matter, and supersedes all prior and
          contemporaneous understandings, agreements, representations, and
          warranties, whether written or oral, regarding such subject matter.
          This MNDA may only be amended, modified, waived, or supplemented by an
          agreement in writing signed by both parties. Notices, requests and
          approvals under this MNDA must be sent in writing to the email or
          postal addresses on the Cover Page and are deemed delivered on receipt.
          This MNDA may be executed in counterparts, including electronic copies,
          each of which is deemed an original and which together form the same
          agreement.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Mutual Non-Disclosure Agreement{" "}
          <a
            href="https://commonpaper.com/standards/mutual-nda/1.0/"
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

function SignatureBlock({
  party,
  company,
  name,
  title,
  address,
  date,
}: {
  party: string;
  company: string;
  name: string;
  title: string;
  address: string;
  date: string;
}) {
  return (
    <div className="text-sm">
      <p className="font-bold text-slate-700 mb-2">{party}</p>
      <div className="space-y-2">
        <SigRow label="Company" value={company} />
        <SigRow label="Signature" value="" blank />
        <SigRow label="Printed Name" value={name} />
        <SigRow label="Title" value={title} />
        <SigRow label="Notice Address" value={address} />
        <SigRow label="Date" value={date} />
      </div>
    </div>
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
