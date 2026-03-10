"use client";

import { AiAddendumFormData, MODEL_TRAINING_LABELS } from "@/lib/ai-addendum-fields";

interface Props {
  data: AiAddendumFormData;
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

export default function AiAddendumPreview({ data }: Props) {
  const provider = data.providerCompany;
  const customer = data.customerCompany;

  return (
    <div
      id="ai-addendum-document"
      className="bg-white min-h-full px-12 py-10 font-serif text-slate-900 leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Document Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          AI Addendum
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Addendum for AI-Powered Products and Services
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
            <CoverRow label="Model Training">
              <span className="font-semibold">
                {MODEL_TRAINING_LABELS[data.modelTraining]}
              </span>
            </CoverRow>
            <CoverRow label="Training Data">
              <F value={data.trainingData} label="Training Data" />
            </CoverRow>
            <CoverRow label="Training Purposes">
              <F value={data.trainingPurposes} label="Training Purposes" />
            </CoverRow>
            <CoverRow label="Training Restrictions">
              <F value={data.trainingRestrictions} label="Training Restrictions" />
            </CoverRow>
            <CoverRow label="Improvement Restrictions">
              <F value={data.improvementRestrictions} label="Improvement Restrictions" />
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
          <strong>1. AI Services.</strong> This Addendum governs the use of
          artificial intelligence features within the{" "}
          <F value={data.product} label="Product" /> (&ldquo;
          <strong>AI Services</strong>&rdquo;) provided by{" "}
          <F value={provider} label="Provider" /> (&ldquo;
          <strong>Provider</strong>&rdquo;) to{" "}
          <F value={customer} label="Customer" /> (&ldquo;
          <strong>Customer</strong>&rdquo;). Customer may use the AI Services
          solely in connection with its authorized use of the Product. Customer
          shall not: (a) use AI Services to develop competing products or
          services; (b) reverse engineer, decompile, or attempt to extract the
          models, algorithms, or training data underlying the AI Services; (c)
          use AI Services in any manner that violates applicable laws or
          regulations; or (d) represent AI-generated outputs as human-created
          where disclosure of AI involvement is required by law.
        </p>

        <p className="text-sm mb-4">
          <strong>2. Model Training.</strong>{" "}
          {data.modelTraining === "enabled" ? (
            <>
              Provider may use Customer Data to train and improve the models
              underlying the AI Services, subject to the following conditions.
              Training data shall be limited to:{" "}
              <F value={data.trainingData} label="Training Data" />. Training
              shall be conducted solely for the following purposes:{" "}
              <F value={data.trainingPurposes} label="Training Purposes" />.
              {data.trainingRestrictions && (
                <>
                  {" "}The following restrictions apply to model training:{" "}
                  <F value={data.trainingRestrictions} label="Training Restrictions" />.
                </>
              )}
            </>
          ) : (
            <>
              Provider shall not use Customer Data to train, retrain, or
              improve any machine learning models or AI systems. Provider shall
              implement technical and organizational measures to ensure Customer
              Data is not incorporated into any training datasets.
            </>
          )}{" "}
          {data.improvementRestrictions && (
            <>
              The following restrictions apply to service improvement:{" "}
              <F value={data.improvementRestrictions} label="Improvement Restrictions" />.
            </>
          )}
        </p>

        <p className="text-sm mb-4">
          <strong>3. Intellectual Property.</strong> As between the parties:
          (a) Customer retains all rights in Customer Data provided as input to
          the AI Services; (b) Provider retains all rights in the AI Services,
          including the underlying models, algorithms, and training
          methodologies; (c) outputs generated by the AI Services using
          Customer Data (&ldquo;<strong>Outputs</strong>&rdquo;) are owned by
          Customer, subject to Provider&apos;s underlying intellectual property
          rights in the AI Services. Provider makes no claims of ownership over
          Outputs. Customer acknowledges that similar outputs may be generated
          for other customers using different inputs.
        </p>

        <p className="text-sm mb-4">
          <strong>4. Disclaimers.</strong> THE AI SERVICES ARE PROVIDED &ldquo;AS
          IS&rdquo;. PROVIDER DOES NOT WARRANT THAT OUTPUTS WILL BE ACCURATE,
          COMPLETE, OR ERROR-FREE. CUSTOMER ACKNOWLEDGES THAT AI-GENERATED
          OUTPUTS MAY CONTAIN ERRORS, BIASES, OR INACCURACIES AND THAT CUSTOMER
          IS SOLELY RESPONSIBLE FOR EVALUATING AND VALIDATING ALL OUTPUTS BEFORE
          USE. PROVIDER DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
          WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT, WITH RESPECT TO THE AI SERVICES AND OUTPUTS.
        </p>

        <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200 text-center">
          Common Paper AI Addendum free to use under{" "}
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
