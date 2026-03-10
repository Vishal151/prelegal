import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NdaChat from "@/components/NdaChat";
import { ChatMessage } from "@/lib/chat-api";

const noop = () => {};

describe("NdaChat", () => {
  describe("empty state", () => {
    it("shows placeholder text when no messages", () => {
      render(<NdaChat messages={[]} isLoading={false} onSend={noop} />);
      expect(
        screen.getByText(/tell me about the nda/i)
      ).toBeInTheDocument();
    });

    it("renders the input and send button", () => {
      render(<NdaChat messages={[]} isLoading={false} onSend={noop} />);
      expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    });
  });

  describe("messages", () => {
    it("renders user messages", () => {
      const msgs: ChatMessage[] = [
        { role: "user", content: "My company is Acme" },
      ];
      render(<NdaChat messages={msgs} isLoading={false} onSend={noop} />);
      expect(screen.getByText("My company is Acme")).toBeInTheDocument();
    });

    it("renders assistant messages", () => {
      const msgs: ChatMessage[] = [
        { role: "assistant", content: "Got it, Acme Inc." },
      ];
      render(<NdaChat messages={msgs} isLoading={false} onSend={noop} />);
      expect(screen.getByText("Got it, Acme Inc.")).toBeInTheDocument();
    });

    it("renders multiple messages in order", () => {
      const msgs: ChatMessage[] = [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi there" },
        { role: "user", content: "Acme Inc and Beta Corp" },
      ];
      render(<NdaChat messages={msgs} isLoading={false} onSend={noop} />);
      expect(screen.getByText("Hello")).toBeInTheDocument();
      expect(screen.getByText("Hi there")).toBeInTheDocument();
      expect(screen.getByText("Acme Inc and Beta Corp")).toBeInTheDocument();
    });
  });

  describe("sending messages", () => {
    it("calls onSend with trimmed input on submit", () => {
      const onSend = vi.fn();
      render(<NdaChat messages={[]} isLoading={false} onSend={onSend} />);
      const input = screen.getByPlaceholderText(/type a message/i);
      fireEvent.change(input, { target: { value: "  My company is Acme  " } });
      fireEvent.submit(input.closest("form")!);
      expect(onSend).toHaveBeenCalledWith("My company is Acme");
    });

    it("clears input after sending", () => {
      const onSend = vi.fn();
      render(<NdaChat messages={[]} isLoading={false} onSend={onSend} />);
      const input = screen.getByPlaceholderText(/type a message/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "Test" } });
      fireEvent.submit(input.closest("form")!);
      expect(input.value).toBe("");
    });

    it("does not call onSend with empty input", () => {
      const onSend = vi.fn();
      render(<NdaChat messages={[]} isLoading={false} onSend={onSend} />);
      fireEvent.submit(screen.getByPlaceholderText(/type a message/i).closest("form")!);
      expect(onSend).not.toHaveBeenCalled();
    });
  });

  describe("loading state", () => {
    it("shows thinking indicator when loading", () => {
      render(<NdaChat messages={[]} isLoading={true} onSend={noop} />);
      expect(screen.getByText("Thinking...")).toBeInTheDocument();
    });

    it("disables input when loading", () => {
      render(<NdaChat messages={[]} isLoading={true} onSend={noop} />);
      expect(screen.getByPlaceholderText(/type a message/i)).toBeDisabled();
    });

    it("disables send button when loading", () => {
      render(<NdaChat messages={[]} isLoading={true} onSend={noop} />);
      expect(screen.getByRole("button", { name: /send/i })).toBeDisabled();
    });
  });
});
