import { describe, it, expect } from "vitest";
import { CATALOG, getCatalogEntry } from "@/lib/catalog";

describe("catalog", () => {
  it("has 11 document types", () => {
    expect(CATALOG).toHaveLength(11);
  });

  it("each entry has required fields", () => {
    for (const entry of CATALOG) {
      expect(entry.docType).toBeTruthy();
      expect(entry.name).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.route).toMatch(/^\//);
    }
  });

  it("has unique doc types", () => {
    const types = CATALOG.map((c) => c.docType);
    expect(new Set(types).size).toBe(types.length);
  });

  it("getCatalogEntry returns correct entry", () => {
    const nda = getCatalogEntry("nda");
    expect(nda?.name).toBe("Mutual Non-Disclosure Agreement");
    expect(nda?.route).toBe("/nda");
  });

  it("getCatalogEntry returns undefined for unknown", () => {
    // @ts-expect-error testing invalid input
    expect(getCatalogEntry("unknown")).toBeUndefined();
  });
});
