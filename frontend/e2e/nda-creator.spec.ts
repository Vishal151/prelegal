import { test, expect } from "@playwright/test";

test.describe("NDA Creator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/nda");
  });

  test.describe("layout", () => {
    test("shows form panel and NDA preview side-by-side", async ({ page }) => {
      await expect(page.getByText("Agreement Details")).toBeVisible();
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /Mutual Non-Disclosure Agreement/i,
        })
      ).toBeVisible();
    });

    test("form panel contains all three sections", async ({ page }) => {
      await expect(page.getByText("Agreement Terms")).toBeVisible();
      // Use .first() because "Party 1" and "Party 2" also appear in the NDA preview
      await expect(page.getByText("Party 1").first()).toBeVisible();
      await expect(page.getByText("Party 2").first()).toBeVisible();
    });

    test("NDA preview contains Cover Page and Standard Terms headings", async ({
      page,
    }) => {
      const doc = page.locator("#nda-document");
      // Use heading role to avoid matching inline "Cover Page" references in body text
      await expect(
        doc.getByRole("heading", { name: "Cover Page" })
      ).toBeVisible();
      await expect(
        doc.getByRole("heading", { name: "Standard Terms" })
      ).toBeVisible();
    });

    test("Download as PDF button is visible", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: /Download as PDF/i })
      ).toBeVisible();
    });
  });

  test.describe("live preview updates", () => {
    test("typing Party 1 Company updates the NDA preview", async ({ page }) => {
      await page.getByPlaceholder("Acme Inc.").fill("Globex Corporation");
      await expect(page.locator("#nda-document")).toContainText(
        "Globex Corporation"
      );
    });

    test("typing Party 2 Company updates the NDA preview", async ({ page }) => {
      await page.getByPlaceholder("Beta Corp.").fill("Initech Ltd");
      await expect(page.locator("#nda-document")).toContainText("Initech Ltd");
    });

    test("typing Governing Law updates standard terms section", async ({
      page,
    }) => {
      await page.getByPlaceholder("e.g. California").fill("Delaware");
      const preview = page.locator("#nda-document");
      await expect(preview).toContainText("State of Delaware");
    });

    test("typing Jurisdiction updates standard terms section", async ({
      page,
    }) => {
      await page
        .getByPlaceholder("e.g. San Francisco, California")
        .fill("Wilmington, Delaware");
      await expect(page.locator("#nda-document")).toContainText(
        "Wilmington, Delaware"
      );
    });

    test("both party names appear in the intro when both are filled", async ({
      page,
    }) => {
      await page.getByPlaceholder("Acme Inc.").fill("Acme Corp");
      await page.getByPlaceholder("Beta Corp.").fill("Beta Ltd");
      await expect(page.locator("#nda-document")).toContainText(
        "Acme Corp and Beta Ltd are"
      );
    });

    test("effective date input is visible and enabled", async ({ page }) => {
      // Date formatting is verified by unit tests (NdaPreview.test.tsx).
      // Here we confirm the field is present and interactive in the real browser.
      const dateInput = page.locator('input[type="date"]').first();
      await expect(dateInput).toBeVisible();
      await expect(dateInput).toBeEnabled();
    });
  });

  test.describe("MNDA Term radio", () => {
    test("defaults to '1 year' and preview reflects it", async ({ page }) => {
      await expect(
        page
          .locator("#nda-document")
          .getByText("1 year from the Effective Date")
          .first()
      ).toBeVisible();
    });

    test("switching to Indefinite updates the preview", async ({ page }) => {
      await page
        .getByRole("radio", {
          name: "Indefinite, until terminated by either party",
        })
        .click();
      await expect(page.locator("#nda-document")).toContainText(
        "indefinite, until terminated by either party"
      );
    });
  });

  test.describe("Term of Confidentiality radio", () => {
    test("switching to Perpetual updates the preview", async ({ page }) => {
      await page.getByRole("radio", { name: "Perpetual" }).click();
      await expect(page.locator("#nda-document")).toContainText("perpetual");
    });
  });

  test.describe("placeholder state", () => {
    test("empty Governing Law shows placeholder text in preview", async ({
      page,
    }) => {
      // When no value is entered, the F component renders the label as italic placeholder
      const preview = page.locator("#nda-document");
      await expect(preview.getByText("Governing Law").first()).toBeVisible();
    });
  });
});
