import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NdaForm from "@/components/NdaForm";
import { defaultFormData } from "@/lib/nda-fields";

const noop = () => {};

describe("NdaForm", () => {
  describe("section rendering", () => {
    it("renders Agreement Terms section", () => {
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={noop} />);
      expect(screen.getByText("Agreement Terms")).toBeInTheDocument();
    });

    it("renders Party 1 section", () => {
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={noop} />);
      expect(screen.getByText("Party 1")).toBeInTheDocument();
    });

    it("renders Party 2 section", () => {
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={noop} />);
      expect(screen.getByText("Party 2")).toBeInTheDocument();
    });

    it("renders the header description", () => {
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={noop} />);
      expect(
        screen.getByText(/Fill in the fields to populate the NDA/i)
      ).toBeInTheDocument();
    });
  });

  describe("text inputs", () => {
    it("calls onChange with 'party1Company' when Party 1 company input changes", () => {
      const onChange = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={onChange} onDownload={noop} />);
      fireEvent.change(screen.getByPlaceholderText("Acme Inc."), {
        target: { value: "My Corp" },
      });
      expect(onChange).toHaveBeenCalledWith("party1Company", "My Corp");
    });

    it("calls onChange with 'party2Company' when Party 2 company input changes", () => {
      const onChange = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={onChange} onDownload={noop} />);
      fireEvent.change(screen.getByPlaceholderText("Beta Corp."), {
        target: { value: "Other Ltd" },
      });
      expect(onChange).toHaveBeenCalledWith("party2Company", "Other Ltd");
    });

    it("calls onChange with 'governingLaw' when that input changes", () => {
      const onChange = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={onChange} onDownload={noop} />);
      fireEvent.change(screen.getByPlaceholderText("e.g. California"), {
        target: { value: "New York" },
      });
      expect(onChange).toHaveBeenCalledWith("governingLaw", "New York");
    });

    it("calls onChange with 'jurisdiction' when that input changes", () => {
      const onChange = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={onChange} onDownload={noop} />);
      fireEvent.change(
        screen.getByPlaceholderText("e.g. San Francisco, California"),
        { target: { value: "New York, New York" } }
      );
      expect(onChange).toHaveBeenCalledWith("jurisdiction", "New York, New York");
    });

    it("calls onChange with 'party1Name' when printed name input changes", () => {
      const onChange = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={onChange} onDownload={noop} />);
      fireEvent.change(screen.getByPlaceholderText("Jane Smith"), {
        target: { value: "Alice Brown" },
      });
      expect(onChange).toHaveBeenCalledWith("party1Name", "Alice Brown");
    });
  });

  describe("radio buttons", () => {
    it("MNDA Term defaults to 1year radio being checked", () => {
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={noop} />);
      const radios = screen.getAllByRole("radio", {
        name: "1 year from the Effective Date",
      });
      // First occurrence is the MNDA Term radio
      expect(radios[0]).toBeChecked();
    });

    it("calls onChange with 'mndaTerm' and 'indefinite' when indefinite radio clicked", () => {
      const onChange = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={onChange} onDownload={noop} />);
      fireEvent.click(
        screen.getByRole("radio", {
          name: "Indefinite, until terminated by either party",
        })
      );
      expect(onChange).toHaveBeenCalledWith("mndaTerm", "indefinite");
    });

    it("calls onChange with 'termOfConfidentiality' and 'perpetual' when perpetual radio clicked", () => {
      const onChange = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={onChange} onDownload={noop} />);
      fireEvent.click(screen.getByRole("radio", { name: "Perpetual" }));
      expect(onChange).toHaveBeenCalledWith("termOfConfidentiality", "perpetual");
    });
  });

  describe("download button", () => {
    it("renders the Download as PDF button", () => {
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={noop} />);
      expect(
        screen.getByRole("button", { name: /Download as PDF/i })
      ).toBeInTheDocument();
    });

    it("calls onDownload when the button is clicked", () => {
      const onDownload = vi.fn();
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={onDownload} />);
      fireEvent.click(screen.getByRole("button", { name: /Download as PDF/i }));
      expect(onDownload).toHaveBeenCalledOnce();
    });

    it("shows helper text about print dialog", () => {
      render(<NdaForm data={defaultFormData} onChange={noop} onDownload={noop} />);
      expect(screen.getByText(/Save as PDF/i)).toBeInTheDocument();
    });
  });

  describe("reflects data prop", () => {
    it("shows current value in Party 1 company input", () => {
      render(
        <NdaForm
          data={{ ...defaultFormData, party1Company: "Prefilled Corp" }}
          onChange={noop}
          onDownload={noop}
        />
      );
      expect(screen.getByDisplayValue("Prefilled Corp")).toBeInTheDocument();
    });

    it("shows current governing law value", () => {
      render(
        <NdaForm
          data={{ ...defaultFormData, governingLaw: "Texas" }}
          onChange={noop}
          onDownload={noop}
        />
      );
      expect(screen.getByDisplayValue("Texas")).toBeInTheDocument();
    });
  });
});
