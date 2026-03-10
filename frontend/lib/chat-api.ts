import { NdaFormData } from "./nda-fields";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  fields: Partial<NdaFormData>;
}

export async function sendNdaChat(
  messages: ChatMessage[]
): Promise<ChatResponse> {
  const res = await fetch("/api/chat/nda", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status}`);
  }
  return res.json();
}
