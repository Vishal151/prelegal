"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatPanel from "@/components/ChatPanel";
import { sendSelectChat, ChatMessage } from "@/lib/chat-api";
import { CATALOG, getCatalogEntry } from "@/lib/catalog";

export default function DocumentSelectorChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(content: string) {
    const userMsg: ChatMessage = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);
    try {
      const { reply, confirmed_doc_type } = await sendSelectChat(updated);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      if (confirmed_doc_type) {
        const entry = getCatalogEntry(confirmed_doc_type as Parameters<typeof getCatalogEntry>[0]);
        if (entry) {
          // Short delay so user can read the confirmation message
          setTimeout(() => router.push(entry.route), 1000);
        }
      }
    } catch (err) {
      console.error("Select chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Left panel — chat */}
      <div className="w-[480px] shrink-0 flex flex-col overflow-hidden">
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          onSend={handleSend}
          title="Prelegal Assistant"
          subtitle="What legal document do you need?"
          emptyHint="Tell me what document you need — an NDA, cloud service agreement, pilot agreement, or something else."
        />
      </div>

      {/* Right panel — document catalog */}
      <div className="flex-1 overflow-y-auto p-8">
        <h2 className="text-lg font-bold text-[#032147] mb-4">Available Documents</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {CATALOG.map((entry) => (
            <button
              key={entry.docType}
              onClick={() => router.push(entry.route)}
              className="text-left p-4 bg-white rounded-lg border border-slate-200 hover:border-[#209dd7] hover:shadow-md transition cursor-pointer"
            >
              <h3 className="text-sm font-semibold text-[#032147]">{entry.name}</h3>
              <p className="text-xs text-[#888888] mt-1">{entry.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
