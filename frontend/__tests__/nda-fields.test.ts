import { describe, it, expect } from "vitest";
import { defaultFormData } from "@/lib/nda-fields";

describe("defaultFormData", () => {
  it("defaults mndaTerm to '1year'", () => {
    expect(defaultFormData.mndaTerm).toBe("1year");
  });

  it("defaults termOfConfidentiality to '1year'", () => {
    expect(defaultFormData.termOfConfidentiality).toBe("1year");
  });

  it("pre-fills purpose with the standard evaluation phrase", () => {
    expect(defaultFormData.purpose).toMatch(/business relationship/i);
  });

  it("leaves all party fields empty by default", () => {
    const partyFields = [
      "party1Company",
      "party1Name",
      "party1Title",
      "party1Address",
      "party1Date",
      "party2Company",
      "party2Name",
      "party2Title",
      "party2Address",
      "party2Date",
    ] as const;
    for (const field of partyFields) {
      expect(defaultFormData[field]).toBe("");
    }
  });
});
