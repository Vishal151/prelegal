# Testing — Mutual NDA Creator

## Automated Tests

### Unit / Component Tests (Vitest + React Testing Library)

```bash
cd frontend
npm test
```

Covers:
- **`__tests__/nda-fields.test.ts`** — Default form data shape and values
- **`__tests__/NdaForm.test.tsx`** — Form renders all sections, inputs call `onChange`, radios call `onChange`, download button calls `onDownload`, reflects `data` prop values
- **`__tests__/NdaPreview.test.tsx`** — Document structure (title, headings, 11 sections, CC attribution), field interpolation (values shown when filled, placeholder shown when empty), MNDA Term and Term of Confidentiality labels, signature block

### E2E Tests (Playwright + Chromium)

```bash
cd frontend
npm run test:e2e
```

Starts the dev server automatically, then tests the real browser:
- Layout: side-by-side form and preview, all form sections visible, Download button present
- Live preview: typing in Party 1, Party 2, Governing Law, Jurisdiction all update the preview in real time
- Intro text shows both party names once both company fields are filled
- MNDA Term radio switches between "1 year" and "indefinite" in the preview
- Term of Confidentiality radio switches to "perpetual" in the preview
- Placeholder italic text appears in the preview when Governing Law is empty

---

## Manual Test Checklist

Run these after `npm run dev` (http://localhost:3000):

### Layout
- [ ] Page loads without errors
- [ ] Form panel (left) and NDA preview (right) are visible side-by-side
- [ ] Form panel is scrollable when content overflows
- [ ] NDA preview panel is scrollable independently of the form

### Form → Preview Live Updates
- [ ] Typing in **Party 1 Company** immediately shows the company name in the Cover Page signature block and in the Section 1 intro sentence
- [ ] Typing in **Party 2 Company** does the same
- [ ] When both Party 1 and Party 2 companies are filled, the intro reads "[Company1] and [Company2] are identified on the Cover Page"
- [ ] Typing in **Governing Law** shows the state in the Cover Page table row and in Section 9 (two occurrences)
- [ ] Typing in **Jurisdiction** shows the location in the Cover Page table row and in Section 9 (two occurrences)
- [ ] Typing in **Purpose** (editing the textarea) updates Section 1 and Section 2 inline references
- [ ] Selecting **Effective Date** shows the date in long-form (e.g. "June 15, 2025") in the Cover Page and Section 5
- [ ] Switching **MNDA Term** to "Indefinite" updates the Cover Page row and Section 5 text
- [ ] Switching **Term of Confidentiality** to "Perpetual" updates the Cover Page row and Section 5 text
- [ ] Filling **Party 1 Name, Title, Notice Address, Signing Date** shows values in the Party 1 signature block
- [ ] Filling **Party 2 Name, Title, Notice Address, Signing Date** shows values in the Party 2 signature block

### Empty-Field Placeholders
- [ ] Unfilled **Governing Law** shows dashed italic placeholder text in the preview (not a blank gap)
- [ ] Unfilled **Jurisdiction** shows dashed italic placeholder text
- [ ] Unfilled **Party 1 Company** shows dashed placeholder in signature block

### PDF Download
- [ ] Clicking **Download as PDF** opens the browser's print dialog
- [ ] In the print preview, only the NDA document is visible — the form panel is hidden
- [ ] The document spans multiple pages (Cover Page + all 11 Standard Terms sections)
- [ ] Saving as PDF produces a readable, well-formatted A4 document
- [ ] Unfilled placeholder fields print as short dashed underlines (not italic browser-styled text)

### Edge Cases
- [ ] Very long company name (50+ characters) does not break the cover page table layout
- [ ] Clearing a field reverts the preview back to showing the dashed placeholder
- [ ] Pasting text into the Purpose textarea immediately updates all three references in the preview
