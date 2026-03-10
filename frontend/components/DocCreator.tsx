"use client";

import { useState } from "react";
import ChatPanel from "@/components/ChatPanel";
import { sendChat, ChatMessage } from "@/lib/chat-api";

interface Props {
  docType: string;
  docName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultFormData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FormComponent: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PreviewComponent: React.ComponentType<any>;
}

type Tab = "chat" | "form";

export default function DocCreator({
  docType,
  docName,
  defaultFormData,
  FormComponent,
  PreviewComponent,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>(defaultFormData);
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(field: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSend(content: string) {
    const userMsg: ChatMessage = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);
    try {
      const { reply, fields } = await sendChat(docType, updated);
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
            <ChatPanel
              messages={messages}
              isLoading={isLoading}
              onSend={handleSend}
              subtitle={`Describe your ${docName} and I'll fill in the fields`}
              emptyHint={`Tell me about the ${docName} you need.`}
            />
          ) : (
            <FormComponent
              data={formData}
              onChange={handleChange}
              onDownload={() => window.print()}
            />
          )}
        </div>
      </div>

      {/* Right panel — document preview */}
      <div className="flex-1 overflow-y-auto bg-slate-100 print:overflow-visible print:bg-white print:block print:h-auto">
        <div className="max-w-3xl mx-auto my-6 shadow-sm rounded-lg overflow-hidden print:shadow-none print:rounded-none print:my-0 print:max-w-none print:overflow-visible">
          <PreviewComponent data={formData} />
        </div>
      </div>
    </div>
  );
}
