"use client";

import { useState } from "react";
import NdaChat from "@/components/NdaChat";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import { sendNdaChat, ChatMessage } from "@/lib/chat-api";
import { defaultFormData, NdaFormData } from "@/lib/nda-fields";

type Tab = "chat" | "form";

export default function NdaCreator() {
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);
  const [activeTab, setActiveTab] = useState<Tab>("form");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange<K extends keyof NdaFormData>(
    field: K,
    value: NdaFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSend(content: string) {
    const userMsg: ChatMessage = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);
    try {
      const { reply, fields } = await sendNdaChat(updated);
      setFormData((prev) => ({ ...prev, ...fields }));
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden print:block print:h-auto print:overflow-visible">
      {/* Left panel (hidden on print) */}
      <div className="w-96 shrink-0 flex flex-col overflow-hidden print:hidden">
        {/* Tab bar */}
        <div className="flex border-b border-slate-200 bg-white shrink-0">
          {(["chat", "form"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeTab === tab
                  ? "text-[#209dd7] border-b-2 border-[#209dd7]"
                  : "text-[#888888] hover:text-slate-600"
              }`}
            >
              {tab === "chat" ? "AI Chat" : "Form"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "chat" ? (
            <NdaChat
              messages={messages}
              isLoading={isLoading}
              onSend={handleSend}
            />
          ) : (
            <NdaForm
              data={formData}
              onChange={handleChange}
              onDownload={() => window.print()}
            />
          )}
        </div>
      </div>

      {/* Right panel — NDA preview */}
      <div className="flex-1 overflow-y-auto bg-slate-100 print:overflow-visible print:bg-white print:block print:h-auto">
        <div className="max-w-3xl mx-auto my-6 shadow-sm rounded-lg overflow-hidden print:shadow-none print:rounded-none print:my-0 print:max-w-none print:overflow-visible">
          <NdaPreview data={formData} />
        </div>
      </div>
    </div>
  );
}
