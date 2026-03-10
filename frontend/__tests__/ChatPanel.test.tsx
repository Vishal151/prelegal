import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatPanel from "@/components/ChatPanel";

describe("ChatPanel", () => {
  const defaultProps = {
    messages: [] as { role: "user" | "assistant"; content: string }[],
    isLoading: false,
    onSend: vi.fn(),
  };

  it("renders default title and subtitle", () => {
    render(<ChatPanel {...defaultProps} />);
    expect(screen.getByText("AI Chat")).toBeTruthy();
    expect(
      screen.getByText("Describe your document and I'll fill in the fields")
    ).toBeTruthy();
  });

  it("renders custom title and subtitle", () => {
    render(
      <ChatPanel
        {...defaultProps}
        title="Custom Title"
        subtitle="Custom subtitle"
      />
    );
    expect(screen.getByText("Custom Title")).toBeTruthy();
    expect(screen.getByText("Custom subtitle")).toBeTruthy();
  });

  it("renders empty hint when no messages", () => {
    render(
      <ChatPanel {...defaultProps} emptyHint="Start chatting!" />
    );
    expect(screen.getByText("Start chatting!")).toBeTruthy();
  });

  it("renders messages", () => {
    const messages = [
      { role: "user" as const, content: "Hello" },
      { role: "assistant" as const, content: "Hi there" },
    ];
    render(<ChatPanel {...defaultProps} messages={messages} />);
    expect(screen.getByText("Hello")).toBeTruthy();
    expect(screen.getByText("Hi there")).toBeTruthy();
  });

  it("calls onSend when form is submitted", () => {
    const onSend = vi.fn();
    render(<ChatPanel {...defaultProps} onSend={onSend} />);
    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "test message" } });
    fireEvent.submit(input.closest("form")!);
    expect(onSend).toHaveBeenCalledWith("test message");
  });

  it("does not send empty messages", () => {
    const onSend = vi.fn();
    render(<ChatPanel {...defaultProps} onSend={onSend} />);
    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.submit(input.closest("form")!);
    expect(onSend).not.toHaveBeenCalled();
  });

  it("shows Thinking indicator when loading", () => {
    render(<ChatPanel {...defaultProps} isLoading={true} />);
    expect(screen.getByText("Thinking")).toBeTruthy();
  });

  it("disables input when loading", () => {
    render(<ChatPanel {...defaultProps} isLoading={true} />);
    const input = screen.getByPlaceholderText("Type a message...");
    expect(input).toHaveProperty("disabled", true);
  });
});
