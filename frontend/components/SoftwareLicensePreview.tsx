"use client";

import {
  SoftwareLicenseFormData,
  PAYMENT_PROCESS_LABELS,
} from "@/lib/software-license-fields";

interface Props {
  data: SoftwareLicenseFormData;
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

export default function SoftwareLicensePreview({ data }: Props) {
  const provider = data.providerCompany;
  const customer = data.customerCompany;

  return (
    <div
      id="software-license-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Software License Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper Software License Agreement Standard Terms
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
              <F value={provider} label="Provider" />
            </CoverRow>
            <CoverRow label="Customer">
              <F value={customer} label="Customer" />
            </CoverRow>
            <CoverRow label="Software">
              <F value={data.software} label="Software" />
            </CoverRow>
            <CoverRow label="Subscription Period">
              <F value={data.subscriptionPeriod} label="Subscription Period" />
            </CoverRow>
            <CoverRow label="Order Date">
              <F value={formatDate(data.orderDate)} label="Order Date" />
            </CoverRow>
            <CoverRow label="Non-Renewal Notice">
              {data.nonRenewalNoticeDays ? (
                <span className="font-semibold">
                  {data.nonRenewalNoticeDays} days before end of current period
                </span>
              ) : (
                <F value="" label="Non-Renewal Notice Days" />
              )}
            </CoverRow>
            <CoverRow label="Permitted Uses">
              <F value={data.permittedUses} label="Permitted Uses" />
            </CoverRow>
            <CoverRow label="License Limits">
              <F value={data.licenseLimits} label="License Limits" />
            </CoverRow>
            <CoverRow label="Warranty Period">
              <F value={data.warrantyPeriod} label="Warranty Period" />
            </CoverRow>
            <CoverRow label="Payment Process">
              <span className="font-semibold">
                {PAYMENT_PROCESS_LABELS[data.paymentProcess]}
              </span>
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
            <CoverRow label="Provider Notice Address">
              <F
                value={data.providerNoticeAddress}
                label="Provider Notice Address"
              />
            </CoverRow>
            <CoverRow label="Customer Notice Address">
              <F
                value={data.customerNoticeAddress}
                label="Customer Notice Address"
              />
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
          <strong>1. License Grant.</strong> During the{" "}
          <F value={data.subscriptionPeriod} label="Subscription Period" /> and
          subject to the terms of this Agreement,{" "}
          <F value={provider} label="Provider" /> grants{" "}
          <F value={customer} label="Customer" /> a limited, non-exclusive,
          non-sublicensable, non-transferable license to install and use the
          Software (<F value={data.software} label="Software" />) on systems
          owned or controlled by{" "}
          <F value={customer} label="Customer" /> for the{" "}
          <F value={data.permittedUses} label="Permitted Uses" />.{" "}
          {data.licenseLimits && (
            <>
              Use is subject to the following License Limits:{" "}
              <F value={data.licenseLimits} label="License Limits" />.
            </>
          )}
          {" "}Customer will not (and will not allow anyone else to): (i) reverse
          engineer, decompile, or attempt to discover any source code or
          underlying algorithms of the Product; (ii) provide, sell, transfer,
          sublicense, lend, distribute, rent, or otherwise allow others to access
          or use the Product; (iii) remove any proprietary notices or labels;
          (iv) copy, modify, or create derivative works of the Product; or (v)
          use the Product to develop a competing service or product.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Updates &amp; Support.</strong> During the Subscription
          Period, <F value={provider} label="Provider" /> will provide to{" "}
          <F value={customer} label="Customer" />, at no additional charge,
          updates and maintenance releases that{" "}
          <F value={provider} label="Provider" /> makes generally available to
          its customers who have purchased the same Product.{" "}
          <F value={provider} label="Provider" /> retains all right, title, and
          interest in and to the Product, whether developed before or after the
          Order Date.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Payment.</strong> Unless the Order Form specifies a
          different currency, all Fees are in U.S. Dollars and are exclusive of
          taxes. The Fees for this Agreement are{" "}
          <F value={data.fees} label="Fees" />. The Payment Process is{" "}
          <span className="font-semibold">
            {PAYMENT_PROCESS_LABELS[data.paymentProcess]}
          </span>
          .{" "}
          <F value={customer} label="Customer" /> is responsible for all duties,
          taxes, and levies that apply to Fees, including sales, use, VAT, GST,
          or withholding.{" "}
          <F value={customer} label="Customer" /> is not responsible for{" "}
          <F value={provider} label="Provider" />&apos;s income taxes.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Term &amp; Termination.</strong> This Agreement starts on
          the <F value={formatDate(data.orderDate)} label="Order Date" /> and
          continues through the{" "}
          <F value={data.subscriptionPeriod} label="Subscription Period" />,
          automatically renewing for additional periods unless one party gives
          notice of non-renewal at least{" "}
          <F
            value={
              data.nonRenewalNoticeDays
                ? `${data.nonRenewalNoticeDays} days`
                : ""
            }
            label="Non-Renewal Notice Days"
          />{" "}
          before the end of the current period. Either party may terminate
          immediately: (a) if the other party fails to cure a material breach
          following 30 days notice; or (b) upon notice if the other party
          dissolves, stops conducting business, makes an assignment for the
          benefit of creditors, or becomes the debtor in insolvency or
          bankruptcy proceedings. Upon termination,{" "}
          <F value={customer} label="Customer" /> will no longer have any right
          to use the Product.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Warranties.</strong> Each party represents and warrants
          that: (a) it has the legal power and authority to enter into this
          Agreement; (b) it is duly organized, validly existing, and in good
          standing; and (c) it will comply with all Applicable Laws.{" "}
          <F value={provider} label="Provider" /> warrants that, for the{" "}
          <F value={data.warrantyPeriod} label="Warranty Period" />, the
          Software will substantially conform in all material respects to the
          specifications set forth in the Documentation when installed, operated,
          and used according to the Agreement. If{" "}
          <F value={provider} label="Provider" /> breaches this warranty,{" "}
          <F value={provider} label="Provider" /> will: (a) repair or replace
          damaged Software; (b) amend or replace inaccurate Documentation; or
          (c) replace the Software with a functionally equivalent alternative.
        </p>

        <p className="text-sm mb-4">
          <strong>6. Disclaimer.</strong> EXCEPT FOR THE WARRANTIES IN SECTION 5,{" "}
          <span className="uppercase">
            <F value={provider} label="PROVIDER" />
          </span>{" "}
          AND{" "}
          <span className="uppercase">
            <F value={customer} label="CUSTOMER" />
          </span>{" "}
          EACH DISCLAIM ALL OTHER WARRANTIES AND CONDITIONS, WHETHER EXPRESS OR
          IMPLIED, INCLUDING THE IMPLIED WARRANTIES AND CONDITIONS OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
          NON-INFRINGEMENT.
        </p>

        <p className="text-sm mb-4">
          <strong>7. Limitation of Liability.</strong> EACH PARTY&apos;S TOTAL
          CUMULATIVE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THIS
          AGREEMENT WILL NOT EXCEED THE TOTAL FEES PAID OR PAYABLE DURING THE
          TWELVE MONTHS PRECEDING THE CLAIM. UNDER NO CIRCUMSTANCES WILL EITHER
          PARTY BE LIABLE TO THE OTHER FOR LOST PROFITS OR REVENUES, OR FOR
          CONSEQUENTIAL, SPECIAL, INDIRECT, EXEMPLARY, PUNITIVE, OR INCIDENTAL
          DAMAGES RELATING TO THIS AGREEMENT.
        </p>

        <p className="text-sm mb-4">
          <strong>8. Indemnification.</strong>{" "}
          <F value={provider} label="Provider" /> will indemnify, defend, and
          hold harmless <F value={customer} label="Customer" /> from and against
          all claims that the Product infringes a third party&apos;s intellectual
          property rights. <F value={customer} label="Customer" /> will
          indemnify, defend, and hold harmless{" "}
          <F value={provider} label="Provider" /> from and against all claims
          arising from <F value={customer} label="Customer" />&apos;s use of the
          Product in breach of this Agreement. The indemnifying party&apos;s
          obligations are contingent upon the protected party: (a) promptly
          notifying the indemnifying party; (b) providing reasonable assistance;
          and (c) giving sole control over the defense and settlement.
        </p>

        <p className="text-sm mb-4">
          <strong>9. Confidentiality.</strong> Each party (as Recipient) will not
          (a) use the other party&apos;s (as Discloser) Confidential Information
          except as authorized by this Agreement; nor (b) disclose Confidential
          Information to anyone else. Recipient will protect Discloser&apos;s
          Confidential Information using at least the same protections Recipient
          uses for its own similar information but no less than a reasonable
          standard of care. Confidential Information does not include information
          that: (a) was publicly known; (b) was rightfully known before
          disclosure; (c) was received from a third party without restriction; or
          (d) was independently developed.
        </p>

        <p className="text-sm mb-4">
          <strong>10. General Terms.</strong> This Agreement supersedes all prior
          or contemporaneous statements about its subject. Any waiver,
          modification, or change must be in writing and signed by each party.
          The Governing Law of the State of{" "}
          <F value={data.governingLaw} label="Governing Law" /> will govern all
          interpretations and disputes. The parties will bring any legal suit,
          action, or proceeding in the courts located in{" "}
          <F value={data.chosenCourts} label="Chosen Courts" />. Neither party
          may assign any rights or obligations without the prior written consent
          of the other party, except upon merger, change of control, or sale of
          all or substantially all assets. Notices must be sent in writing to the
          Notice Address. This Agreement may be signed in counterparts, including
          by electronic copies.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Software License Agreement{" "}
          <a
            href="https://commonpaper.com/standards/software-license-agreement/1.0/"
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
