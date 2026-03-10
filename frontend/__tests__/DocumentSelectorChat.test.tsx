import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DocumentSelectorChat from "@/components/DocumentSelectorChat";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock chat-api
vi.mock("@/lib/chat-api", () => ({
  sendSelectChat: vi.fn(),
}));

describe("DocumentSelectorChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the chat panel with correct title", () => {
    render(<DocumentSelectorChat />);
    expect(screen.getByText("Prelegal Assistant")).toBeTruthy();
  });

  it("renders the document catalog", () => {
    render(<DocumentSelectorChat />);
    expect(screen.getByText("Available Documents")).toBeTruthy();
    expect(screen.getByText("Mutual Non-Disclosure Agreement")).toBeTruthy();
    expect(screen.getByText("Cloud Service Agreement")).toBeTruthy();
    expect(screen.getByText("Service Level Agreement")).toBeTruthy();
    expect(screen.getByText("Data Processing Agreement")).toBeTruthy();
    expect(screen.getByText("Pilot Agreement")).toBeTruthy();
    expect(screen.getByText("Business Associate Agreement")).toBeTruthy();
    expect(screen.getByText("AI Addendum")).toBeTruthy();
  });

  it("renders all 11 document type buttons", () => {
    render(<DocumentSelectorChat />);
    const buttons = screen.getAllByRole("button").filter(
      (btn) => btn.closest(".grid") !== null
    );
    expect(buttons).toHaveLength(11);
  });
});
