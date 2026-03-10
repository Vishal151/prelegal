"use client";

import { DpaFormData } from "@/lib/dpa-fields";

interface Props {
  data: DpaFormData;
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

export default function DpaPreview({ data }: Props) {
  return (
    <div
      id="dpa-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Data Processing Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper DPA Standard Terms Version 1.0
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
              <F value={data.providerCompany} label="Provider" />
            </CoverRow>
            <CoverRow label="Customer">
              <F value={data.customerCompany} label="Customer" />
            </CoverRow>
            <CoverRow label="Effective Date">
              <F value={formatDate(data.effectiveDate)} label="Effective Date" />
            </CoverRow>
            <CoverRow label="Subject Matter">
              <F value={data.subjectMatter} label="Subject Matter" />
            </CoverRow>
            <CoverRow label="Nature of Processing">
              <F value={data.natureOfProcessing} label="Nature of Processing" />
            </CoverRow>
            <CoverRow label="Purpose of Processing">
              <F value={data.purposeOfProcessing} label="Purpose of Processing" />
            </CoverRow>
            <CoverRow label="Duration of Processing">
              <F value={data.durationOfProcessing} label="Duration of Processing" />
            </CoverRow>
            <CoverRow label="Categories of Data">
              <F value={data.categoriesOfData} label="Categories of Data" />
            </CoverRow>
            <CoverRow label="Categories of Data Subjects">
              <F value={data.categoriesOfSubjects} label="Categories of Data Subjects" />
            </CoverRow>
            <CoverRow label="Approved Subprocessors">
              <F value={data.approvedSubprocessors} label="Approved Subprocessors" />
            </CoverRow>
            <CoverRow label="Governing Law">
              <span>
                State of{" "}
                <F value={data.governingLaw} label="Governing Law" />
              </span>
            </CoverRow>
            <CoverRow label="Provider Notice Address">
              <F value={data.providerNoticeAddress} label="Provider Notice Address" />
            </CoverRow>
            <CoverRow label="Customer Notice Address">
              <F value={data.customerNoticeAddress} label="Customer Notice Address" />
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
          <strong>1. Scope and Purpose.</strong> This Data Processing Agreement
          (&ldquo;<strong>DPA</strong>&rdquo;) forms part of the agreement
          between <F value={data.providerCompany} label="Provider" /> (&ldquo;
          <strong>Provider</strong>&rdquo;) and{" "}
          <F value={data.customerCompany} label="Customer" /> (&ldquo;
          <strong>Customer</strong>&rdquo;) and applies to the processing of
          Personal Data by Provider on behalf of Customer in connection with{" "}
          <F value={data.subjectMatter} label="Subject Matter" />. The purpose
          of processing is{" "}
          <F value={data.purposeOfProcessing} label="Purpose of Processing" />.
          Provider will process Personal Data only as necessary to perform its
          obligations under the Agreement and in accordance with
          Customer&apos;s documented instructions.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Data Processing Instructions.</strong> Provider will
          process Personal Data only on documented instructions from Customer,
          including with regard to transfers of Personal Data to a third country
          or an international organization, unless required to do so by
          applicable law. Provider will promptly inform Customer if, in
          Provider&apos;s opinion, an instruction violates applicable data
          protection laws. The nature of processing is{" "}
          <F value={data.natureOfProcessing} label="Nature of Processing" />,
          covering the following categories of data:{" "}
          <F value={data.categoriesOfData} label="Categories of Data" />,
          relating to the following categories of data subjects:{" "}
          <F value={data.categoriesOfSubjects} label="Categories of Data Subjects" />.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Subprocessors.</strong> Customer authorizes Provider to
          engage the Approved Subprocessors listed on the Cover Page. Provider
          will notify Customer before engaging any new subprocessor and give
          Customer a reasonable opportunity to object. Provider will impose data
          protection obligations on each subprocessor that are no less
          protective than those in this DPA. Provider remains fully liable to
          Customer for the performance of each subprocessor&apos;s obligations.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Data Security.</strong> Provider will implement and
          maintain appropriate technical and organizational measures to protect
          Personal Data against unauthorized or unlawful processing and against
          accidental loss, destruction, or damage. These measures shall include,
          as appropriate: pseudonymization and encryption of Personal Data; the
          ability to ensure ongoing confidentiality, integrity, availability,
          and resilience of processing systems; the ability to restore
          availability and access to Personal Data in a timely manner following
          an incident; and a process for regularly testing, assessing, and
          evaluating the effectiveness of security measures. Provider will
          notify Customer without undue delay after becoming aware of a Personal
          Data breach.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Data Subject Rights.</strong> Provider will assist Customer
          in responding to requests from data subjects exercising their rights
          under applicable data protection laws, including rights of access,
          rectification, erasure, restriction, data portability, and objection.
          Provider will promptly notify Customer if it receives a request
          directly from a data subject and will not respond to the request
          without Customer&apos;s prior written authorization, unless required
          by applicable law.
        </p>

        <p className="text-sm mb-4">
          <strong>6. International Transfers.</strong> Provider will not
          transfer Personal Data to any country outside the European Economic
          Area (EEA) unless appropriate safeguards are in place as required by
          applicable data protection laws. Such safeguards may include Standard
          Contractual Clauses approved by the European Commission, binding
          corporate rules, or an adequacy decision. Where the UK GDPR applies,
          transfers will comply with the UK Addendum to the EU Standard
          Contractual Clauses. Provider will inform Customer of any transfer
          mechanisms relied upon.
        </p>

        <p className="text-sm mb-4">
          <strong>7. Term &amp; Termination.</strong> This DPA will remain in
          effect for the duration of{" "}
          <F value={data.durationOfProcessing} label="Duration of Processing" />.
          Upon termination or expiry, Provider will, at Customer&apos;s
          election, delete or return all Personal Data to Customer and delete
          existing copies unless applicable law requires storage of the Personal
          Data. Provider will certify in writing that it has complied with this
          obligation upon Customer&apos;s request.
        </p>

        <p className="text-sm mb-4">
          <strong>8. General Terms.</strong> This DPA is governed by the laws
          of the State of{" "}
          <F value={data.governingLaw} label="Governing Law" />, without regard
          to conflict of laws provisions. In the event of any conflict between
          this DPA and the Agreement, this DPA will prevail with respect to the
          processing of Personal Data. Provider will make available to Customer
          all information necessary to demonstrate compliance with data
          processing obligations and allow for and contribute to audits and
          inspections conducted by Customer or a mandated auditor. Notices must
          be sent to the addresses specified on the Cover Page.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Data Processing Agreement{" "}
          <a
            href="https://commonpaper.com/standards/data-processing-agreement/1.0/"
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
