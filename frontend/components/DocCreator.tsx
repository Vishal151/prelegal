"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ChatPanel from "@/components/ChatPanel";
import AuthModal from "@/components/AuthModal";
import { sendChat, ChatMessage } from "@/lib/chat-api";
import { saveDocument, loadDocument } from "@/lib/documents-api";
import { useAuth } from "@/context/AuthContext";

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pendingAction = useRef<(() => void) | null>(null);
  const { user } = useAuth();

  // Load saved document on mount for authenticated users
  useEffect(() => {
    if (!user) return;
    loadDocument(docType)
      .then((doc) => {
        if (doc) {
          setFormData((prev) => ({ ...prev, ...doc.fields }));
          if (doc.chat.length > 0) {
            setMessages(doc.chat as ChatMessage[]);
          }
        }
      })
      .catch(() => {});
  }, [user, docType]);

  // Debounced save
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const doSave = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fields: Record<string, any>, chat: ChatMessage[]) => {
      if (!user) return;
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveDocument(docType, fields, chat);
      }, 1000);
    },
    [user, docType],
  );

  function handleChange(field: string, value: unknown) {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      doSave(next, messages);
      return next;
    });
  }

  async function handleSend(content: string) {
    const userMsg: ChatMessage = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);
    try {
      const { reply, fields } = await sendChat(docType, updated);
      const newMessages: ChatMessage[] = [...updated, { role: "assistant", content: reply }];
      setFormData((prev) => {
        const next = { ...prev, ...fields };
        doSave(next, newMessages);
        return next;
      });
      setMessages(newMessages);
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

  function handleDownload() {
    if (!user) {
      pendingAction.current = () => window.print();
      setShowAuthModal(true);
      return;
    }
    window.print();
  }

  function handleAuthSuccess() {
    if (pendingAction.current) {
      const action = pendingAction.current;
      pendingAction.current = null;
      setTimeout(action, 100);
    }
  }

  return (
    <>
      <div className="flex h-full bg-white overflow-hidden print:block print:h-auto print:overflow-visible">
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
                onDownload={handleDownload}
              />
            )}
          </div>
        </div>

        {/* Right panel — document preview */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-100 print:overflow-visible print:bg-white print:block print:h-auto">
          {/* Preview toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 shrink-0 print:hidden">
            <h2 className="text-xs font-semibold text-[#032147] uppercase tracking-wider">
              {docName}
            </h2>
            <button
              onClick={handleDownload}
              className="bg-[#753991] hover:bg-[#612d79] text-white text-xs font-semibold px-4 py-1.5 rounded transition cursor-pointer"
            >
              Download PDF
            </button>
          </div>
          <div className="flex-1 overflow-y-auto print:overflow-visible print:block print:h-auto">
            <div className="max-w-3xl mx-auto my-6 shadow-sm rounded-lg overflow-hidden print:shadow-none print:rounded-none print:my-0 print:max-w-none print:overflow-visible">
              <PreviewComponent data={formData} />
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}
