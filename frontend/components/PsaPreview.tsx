"use client";

import { PsaFormData } from "@/lib/psa-fields";

interface Props {
  data: PsaFormData;
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

export default function PsaPreview({ data }: Props) {
  const provider = data.providerCompany;
  const customer = data.customerCompany;

  return (
    <div
      id="psa-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Professional Services Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper PSA Standard Terms Version 1.0
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
              <F value={provider} label="Provider Company" />
            </CoverRow>
            <CoverRow label="Customer">
              <F value={customer} label="Customer Company" />
            </CoverRow>
            <CoverRow label="Effective Date">
              <F value={formatDate(data.effectiveDate)} label="Effective Date" />
            </CoverRow>
            <CoverRow label="Services Description">
              <F value={data.servicesDescription} label="Services Description" />
            </CoverRow>
            <CoverRow label="Fees">
              <F value={data.fees} label="Fees" />
            </CoverRow>
            <CoverRow label="Payment Period">
              <F value={data.paymentPeriod} label="Payment Period" />
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
          <strong>1. Services.</strong> This Professional Services Agreement
          (&ldquo;<strong>Agreement</strong>&rdquo;) is entered into as of the{" "}
          <F value={formatDate(data.effectiveDate)} label="Effective Date" /> by
          and between{" "}
          {provider && customer
            ? `${provider} ("Provider") and ${customer} ("Customer")`
            : "the Provider and Customer identified on the Cover Page"}
          .
        </p>

        <p className="text-sm mb-2 ml-4">
          <strong>1.1 Scope of Services.</strong> Provider will perform the
          professional services as described on the Cover Page and any applicable
          Statements of Work (SOWs). The services include:{" "}
          <F value={data.servicesDescription} label="Services Description" />.
        </p>

        <p className="text-sm mb-2 ml-4">
          <strong>1.2 Deliverables.</strong> Provider will deliver all
          Deliverables as specified in the applicable SOW. Customer will be
          deemed to have approved a Deliverable if Customer does not reject the
          Deliverable within the Rejection Period specified in the SOW.
        </p>

        <p className="text-sm mb-4 ml-4">
          <strong>1.3 Cooperation.</strong> Customer will reasonably cooperate
          with Provider to allow the performance of Services. Provider is not
          responsible for an inability to perform the Services caused by
          Customer&apos;s failure to cooperate as reasonably requested.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Payment.</strong>
        </p>

        <p className="text-sm mb-2 ml-4">
          <strong>2.1 Fees.</strong> Customer will pay Provider{" "}
          <F value={data.fees} label="Fees" /> for the Services as described in
          the applicable SOW. All Fees are in U.S. Dollars and are exclusive of
          taxes unless otherwise specified.
        </p>

        <p className="text-sm mb-2 ml-4">
          <strong>2.2 Payment Terms.</strong> Customer will pay all undisputed
          invoiced amounts within{" "}
          <F value={data.paymentPeriod} label="Payment Period" /> of receipt of
          each invoice. Except for the prorated refund of prepaid Fees allowed
          with specific termination rights, Fees are non-refundable.
        </p>

        <p className="text-sm mb-4 ml-4">
          <strong>2.3 Taxes.</strong> Customer is responsible for all duties,
          taxes, and levies that apply to Fees, including sales, use, VAT, GST,
          or withholding, that Provider itemizes and includes in an invoice.
          However, Customer is not responsible for Provider&apos;s income taxes.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Term and Termination.</strong> This Agreement will start on
          the{" "}
          <F value={formatDate(data.effectiveDate)} label="Effective Date" /> and
          continue until 12 months have elapsed since the end of the latest SOW
          Term end date. Either party may terminate this Agreement or an SOW
          immediately if the other party fails to cure a material breach within
          30 days after receiving notice of the breach. Upon termination,
          Provider will submit a final invoice for all outstanding Fees accrued
          before termination and Customer will pay the invoice according to the
          payment terms.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Confidentiality.</strong> Each party (&ldquo;
          <strong>Recipient</strong>&rdquo;) will (a) only use the other
          party&apos;s (&ldquo;<strong>Discloser</strong>&rdquo;) Confidential
          Information to fulfill its obligations or exercise its rights under
          this Agreement; and (b) not disclose Confidential Information to third
          parties without the Discloser&apos;s prior written approval, except to
          employees, advisors, contractors, and representatives who each have a
          need to know, bound by equivalent confidentiality obligations.
          Recipient will protect Confidential Information using at least the same
          protections it uses for its own similar information but no less than a
          reasonable standard of care.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Intellectual Property.</strong> Except for Pre-Existing
          Materials and Third-Party Materials, Provider assigns all right, title,
          and interest in the Deliverables (if any) to Customer at the time of
          delivery. Provider grants Customer a non-exclusive, non-transferable,
          perpetual, irrevocable, worldwide license to use Pre-Existing Materials
          only as necessary to use the Deliverables. Neither party transfers any
          rights in any of their products, data, or any other intellectual
          property except as expressly stated in this Agreement.
        </p>

        <p className="text-sm mb-4">
          <strong>6. Indemnification.</strong> Provider will indemnify, defend,
          and hold harmless Customer from and against all claims arising from
          Provider&apos;s breach of representations and warranties, negligence,
          or willful misconduct in performing the Services. Customer will
          indemnify, defend, and hold harmless Provider from and against all
          claims arising from Customer Materials or Customer&apos;s breach of
          this Agreement.
        </p>

        <p className="text-sm mb-4">
          <strong>7. Limitation of Liability.</strong> EXCEPT FOR INDEMNIFICATION
          OBLIGATIONS AND BREACHES OF CONFIDENTIALITY, NEITHER PARTY&apos;S
          TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT
          WILL EXCEED THE TOTAL FEES PAID OR PAYABLE UNDER THIS AGREEMENT. UNDER
          NO CIRCUMSTANCES WILL EITHER PARTY BE LIABLE TO THE OTHER FOR LOST
          PROFITS OR REVENUES, OR FOR CONSEQUENTIAL, SPECIAL, INDIRECT,
          EXEMPLARY, PUNITIVE, OR INCIDENTAL DAMAGES, EVEN IF INFORMED OF THE
          POSSIBILITY IN ADVANCE.
        </p>

        <p className="text-sm mb-4">
          <strong>8. General Terms.</strong> This Agreement is governed by the
          laws of the State of{" "}
          <F value={data.governingLaw} label="Governing Law" />, without regard
          to conflict of laws provisions. Any legal suit, action, or proceeding
          must be brought in the courts located in{" "}
          <F value={data.chosenCourts} label="Chosen Courts" />. The parties are
          independent contractors, not agents, partners, or joint venturers.
          Neither party may assign this Agreement without the prior written
          consent of the other party, except upon merger, change of control, or
          sale of all or substantially all assets. Any notice must be in writing
          and sent to the Notice Address on the Cover Page. This Agreement
          constitutes the entire agreement of the parties with respect to its
          subject matter and supersedes all prior understandings, agreements, and
          representations. This Agreement may be signed in counterparts,
          including by electronic copies.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Professional Services Agreement{" "}
          <a
            href="https://commonpaper.com/standards/professional-services-agreement/1.0/"
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
