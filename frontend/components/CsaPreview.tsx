"use client";

import { CsaFormData, PAYMENT_PROCESS_LABELS } from "@/lib/csa-fields";

interface Props {
  data: CsaFormData;
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

export default function CsaPreview({ data }: Props) {
  return (
    <div
      id="csa-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Cloud Service Agreement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Incorporating Common Paper CSA Standard Terms Version 1.0
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
            <CoverRow label="Cloud Service">
              <F value={data.cloudService} label="Cloud Service" />
            </CoverRow>
            <CoverRow label="Subscription Period">
              <F value={data.subscriptionPeriod} label="Subscription Period" />
            </CoverRow>
            <CoverRow label="Order Date">
              <F value={formatDate(data.orderDate)} label="Order Date" />
            </CoverRow>
            <CoverRow label="Non-Renewal Notice">
              {data.nonRenewalNoticeDays ? (
                <span className="font-semibold text-slate-900">
                  {data.nonRenewalNoticeDays} days before end of Subscription Period
                </span>
              ) : (
                <F value="" label="Non-Renewal Notice Days" />
              )}
            </CoverRow>
            <CoverRow label="Technical Support">
              <F value={data.technicalSupport} label="Technical Support" />
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
          <strong>1. Service.</strong> During the Subscription Period,{" "}
          <F value={data.providerCompany} label="Provider" /> grants{" "}
          <F value={data.customerCompany} label="Customer" /> the right to
          access and use the{" "}
          <F value={data.cloudService} label="Cloud Service" /> for its
          internal business purposes. Provider will provide Technical Support as
          described in this Agreement. Customer is responsible for all actions on
          user accounts and for maintaining the confidentiality of passwords and
          login credentials. Provider may collect and analyze usage data to
          maintain and improve its products and services. Customer retains
          responsibility for the accuracy and content of all Customer Content.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Restrictions.</strong> Customer will not (and will not allow
          anyone else to): reverse engineer, decompile, or attempt to discover
          source code or underlying algorithms of the Product; provide, sell,
          transfer, sublicense, or distribute the Product; remove proprietary
          notices; copy, modify, or create derivative works; conduct unauthorized
          security testing; use the Product to develop a competing service; or
          use the Product with High Risk Activities or in violation of
          applicable laws. Provider may temporarily suspend access if Customer
          breaches these restrictions or uses the Product in a way that
          materially impacts the Product or others.
        </p>

        <p className="text-sm mb-4">
          <strong>3. Privacy.</strong> Before submitting Personal Data governed
          by GDPR, Customer must enter into a data processing agreement with
          Provider. Customer will not submit Prohibited Data to the Product
          unless authorized by the Order Form or Key Terms. If the parties have
          a DPA, each party will comply with its obligations therein, and the
          DPA terms will control in the event of any conflict with this
          Agreement.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Payment.</strong> All Fees are in U.S. Dollars and are
          exclusive of taxes unless specified otherwise. The Payment Process is{" "}
          <span className="font-semibold">
            {PAYMENT_PROCESS_LABELS[data.paymentProcess]}
          </span>
          . Fees of{" "}
          <F value={data.fees} label="Fees" /> apply as described in this
          Agreement. Customer is responsible for all applicable duties, taxes,
          and levies. If Customer has a good-faith disagreement about Fees
          charged, Customer must notify Provider before payment is due, and the
          parties will work together to resolve the dispute within 15 days.
        </p>

        <p className="text-sm mb-4">
          <strong>5. Term.</strong> This Agreement will start on the Order Date
          of <F value={formatDate(data.orderDate)} label="Order Date" />,
          continue through the Subscription Period of{" "}
          <F value={data.subscriptionPeriod} label="Subscription Period" />,
          and automatically renew for additional Subscription Periods unless one
          party gives notice of non-renewal at least{" "}
          <F value={data.nonRenewalNoticeDays} label="notice days" /> days
          before the end of the current period. Either party may terminate
          immediately if the other party fails to cure a material breach
          following 30 days notice, or upon insolvency, dissolution, or
          assignment for the benefit of creditors. Upon termination, Customer
          will no longer have the right to use the Product.
        </p>

        <p className="text-sm mb-4">
          <strong>6. Warranties.</strong> Each party represents and warrants
          that it has the legal power and authority to enter into this Agreement
          and will comply with all applicable laws. Customer warrants that it
          has all rights necessary to submit Customer Content.{" "}
          <F value={data.providerCompany} label="Provider" /> warrants that it
          will not materially reduce the general functionality of the Cloud
          Service during the Subscription Period. If Provider breaches this
          warranty, Customer may terminate the affected Order Form and receive a
          prorated refund of prepaid Fees.
        </p>

        <p className="text-sm mb-4">
          <strong>7. Disclaimer.</strong> PROVIDER MAKES NO GUARANTEES THAT THE
          PRODUCT WILL ALWAYS BE SAFE, SECURE, OR ERROR-FREE, OR THAT IT WILL
          FUNCTION WITHOUT DISRUPTIONS, DELAYS, OR IMPERFECTIONS. EXCEPT FOR
          THE EXPRESS WARRANTIES IN SECTION 6, EACH PARTY DISCLAIMS ALL OTHER
          WARRANTIES AND CONDITIONS, WHETHER EXPRESS OR IMPLIED, INCLUDING THE
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, TITLE, AND NON-INFRINGEMENT, TO THE MAXIMUM EXTENT PERMITTED
          BY APPLICABLE LAWS.
        </p>

        <p className="text-sm mb-4">
          <strong>8. Limitation of Liability.</strong> Each party&apos;s total
          cumulative liability for all claims arising out of or relating to this
          Agreement will not exceed the General Cap Amount. Under no
          circumstances will either party be liable for lost profits or
          revenues (whether direct or indirect), or for consequential, special,
          indirect, exemplary, punitive, or incidental damages, even if
          informed of the possibility in advance. These limitations apply to all
          liability, whether in tort, contract, breach of statutory duty, or
          otherwise.
        </p>

        <p className="text-sm mb-4">
          <strong>9. Indemnification.</strong> Provider will indemnify, defend,
          and hold harmless Customer from Provider Covered Claims and all
          related damages, costs, and expenses, including reasonable
          attorneys&apos; fees. Customer will indemnify, defend, and hold
          harmless Provider from Customer Covered Claims and all related
          damages, costs, and expenses. The indemnifying party has sole control
          over defense and settlement, and the protected party must provide
          prompt notice and reasonable assistance.
        </p>

        <p className="text-sm mb-4">
          <strong>10. Confidentiality.</strong> Each party (as Recipient) will
          not use or disclose the other party&apos;s (as Discloser) Confidential
          Information except as authorized by this Agreement or as needed to
          fulfill obligations hereunder. Recipient will protect Confidential
          Information using at least the same protections it uses for its own
          similar information but no less than a reasonable standard of care.
          Confidential Information excludes information that was publicly known,
          independently developed, or rightfully obtained from a third party
          without restrictions.
        </p>

        <p className="text-sm mb-4">
          <strong>11. Reservation of Rights.</strong> Except for the limited
          license granted to Customer,{" "}
          <F value={data.providerCompany} label="Provider" /> retains all
          right, title, and interest in and to the Product.{" "}
          <F value={data.customerCompany} label="Customer" /> retains all
          right, title, and interest in and to the Customer Content.
        </p>

        <p className="text-sm mb-4">
          <strong>12. General Terms.</strong> This Agreement constitutes the
          entire agreement between the parties and supersedes all prior
          statements about its subject. Any modification must be in writing and
          signed by each party. The laws of the State of{" "}
          <F value={data.governingLaw} label="Governing Law" /> will govern
          this Agreement without regard to conflict of laws provisions. Legal
          proceedings must be brought in the courts located in{" "}
          <F value={data.chosenCourts} label="Chosen Courts" />. Neither party
          may assign this Agreement without prior written consent, except in
          connection with a merger, reorganization, or sale of all or
          substantially all its assets. Notices must be sent to the Notice
          Address specified in this Agreement.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper Cloud Service Agreement{" "}
          <a
            href="https://commonpaper.com/standards/cloud-service-agreement/2.1/"
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
