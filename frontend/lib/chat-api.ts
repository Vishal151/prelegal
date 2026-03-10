export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  fields: Record<string, unknown>;
}

export interface SelectResponse {
  reply: string;
  confirmed_doc_type: string | null;
}

export async function sendChat(
  docType: string,
  messages: ChatMessage[]
): Promise<ChatResponse> {
  const res = await fetch(`/api/chat/${docType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status}`);
  }
  return res.json();
}

export async function sendSelectChat(
  messages: ChatMessage[]
): Promise<SelectResponse> {
  const res = await fetch("/api/chat/select", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Select request failed: ${res.status}`);
  }
  return res.json();
}

/** Backward-compatible alias for existing NDA code. */
export async function sendNdaChat(
  messages: ChatMessage[]
): Promise<ChatResponse> {
  return sendChat("nda", messages);
}
