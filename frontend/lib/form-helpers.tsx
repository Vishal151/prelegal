import React from "react";

export const inputClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

export const textareaClass = `${inputClass} resize-none`;

export const legendClass = "block text-xs font-medium text-slate-600 mb-1";

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 pb-1 border-b border-slate-200">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-medium text-slate-600 mb-1"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
