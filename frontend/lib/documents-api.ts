export interface DocumentListItem {
  id: number;
  doc_type: string;
  updated_at: string;
}

export interface SavedDocument {
  id: number;
  doc_type: string;
  fields: Record<string, unknown>;
  chat: { role: string; content: string }[];
  updated_at: string;
}

async function docFetch(url: string, options?: RequestInit) {
  return fetch(url, { credentials: "include", ...options });
}

export async function listDocuments(): Promise<DocumentListItem[]> {
  const res = await docFetch("/api/documents");
  if (!res.ok) return [];
  return res.json();
}

export async function saveDocument(
  docType: string,
  fields: Record<string, unknown>,
  chat: { role: string; content: string }[],
): Promise<SavedDocument | null> {
  const res = await docFetch("/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doc_type: docType, fields, chat }),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function loadDocument(docType: string): Promise<SavedDocument | null> {
  const res = await docFetch(`/api/documents/${docType}`);
  if (!res.ok) return null;
  return res.json();
}
