import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NdaPreview from "@/components/NdaPreview";
import { defaultFormData, NdaFormData } from "@/lib/nda-fields";

function renderPreview(overrides: Partial<NdaFormData> = {}) {
  return render(<NdaPreview data={{ ...defaultFormData, ...overrides }} />);
}

describe("NdaPreview", () => {
  describe("document structure", () => {
    it("renders the document title as h1", () => {
      renderPreview();
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /Mutual Non-Disclosure Agreement/i,
        })
      ).toBeInTheDocument();
    });

    it("renders a Cover Page section heading", () => {
      renderPreview();
      expect(
        screen.getByRole("heading", { level: 2, name: "Cover Page" })
      ).toBeInTheDocument();
    });

    it("renders a Standard Terms section heading", () => {
      renderPreview();
      expect(
        screen.getByRole("heading", { level: 2, name: "Standard Terms" })
      ).toBeInTheDocument();
    });

    it("renders all 11 standard term headings", () => {
      renderPreview();
      expect(screen.getByText(/1\. Introduction/i)).toBeInTheDocument();
      expect(
        screen.getByText(/2\. Use and Protection/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/3\. Exceptions/i)).toBeInTheDocument();
      expect(
        screen.getByText(/4\. Disclosures Required by Law/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/5\. Term and Termination/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/6\. Return or Destruction/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/7\. Proprietary Rights/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/8\. Disclaimer/i)).toBeInTheDocument();
      expect(
        screen.getByText(/9\. Governing Law and Jurisdiction/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/10\. Equitable Relief/i)).toBeInTheDocument();
      expect(screen.getByText(/11\. General/i)).toBeInTheDocument();
    });

    it("renders the CC BY 4.0 attribution footer", () => {
      renderPreview();
      expect(screen.getByText(/CC BY 4\.0/i)).toBeInTheDocument();
    });
  });

  describe("field interpolation — values", () => {
    it("shows governing law value in cover table and standard terms", () => {
      renderPreview({ governingLaw: "California" });
      const occurrences = screen.getAllByText("California");
      expect(occurrences.length).toBeGreaterThanOrEqual(2);
    });

    it("shows jurisdiction value in cover table and standard terms", () => {
      renderPreview({ jurisdiction: "San Francisco, California" });
      const occurrences = screen.getAllByText("San Francisco, California");
      expect(occurrences.length).toBeGreaterThanOrEqual(2);
    });

    it("shows party 1 company in the signature block", () => {
      renderPreview({ party1Company: "Acme Corp" });
      expect(screen.getAllByText("Acme Corp").length).toBeGreaterThan(0);
    });

    it("shows party 2 company in the signature block", () => {
      renderPreview({ party2Company: "Beta Ltd" });
      expect(screen.getAllByText("Beta Ltd").length).toBeGreaterThan(0);
    });

    it("shows both party names in the intro sentence when both are set", () => {
      renderPreview({
        party1Company: "Acme Corp",
        party2Company: "Beta Ltd",
      });
      expect(screen.getByText(/Acme Corp and Beta Ltd are/)).toBeInTheDocument();
    });

    it("formats effective date as long-form date", () => {
      renderPreview({ effectiveDate: "2025-06-15" });
      expect(screen.getAllByText("June 15, 2025").length).toBeGreaterThan(0);
    });
  });

  describe("MNDA Term label", () => {
    it("shows '1 year from the Effective Date' when mndaTerm is 1year", () => {
      renderPreview({ mndaTerm: "1year" });
      // Multiple occurrences expected (cover page + standard terms)
      expect(
        screen.getAllByText("1 year from the Effective Date").length
      ).toBeGreaterThan(0);
    });

    it("shows indefinite label when mndaTerm is indefinite", () => {
      renderPreview({ mndaTerm: "indefinite" });
      expect(
        screen.getAllByText("indefinite, until terminated by either party")
          .length
      ).toBeGreaterThan(0);
    });
  });

  describe("Term of Confidentiality label", () => {
    it("shows '1 year from the Effective Date' when termOfConfidentiality is 1year", () => {
      renderPreview({ termOfConfidentiality: "1year" });
      expect(
        screen.getAllByText("1 year from the Effective Date").length
      ).toBeGreaterThan(0);
    });

    it("shows 'perpetual' when termOfConfidentiality is perpetual", () => {
      renderPreview({ termOfConfidentiality: "perpetual" });
      expect(screen.getAllByText("perpetual").length).toBeGreaterThan(0);
    });
  });

  describe("signature block", () => {
    it("shows Party 1 and Party 2 headings", () => {
      renderPreview();
      expect(screen.getByText("Party 1")).toBeInTheDocument();
      expect(screen.getByText("Party 2")).toBeInTheDocument();
    });

    it("shows signature label in each block", () => {
      renderPreview();
      const sigLabels = screen.getAllByText(/^Signature:/);
      expect(sigLabels.length).toBe(2);
    });
  });
});
