/**
 * phantomdeps — static claim resolver unit tests
 */

import { resolveClaimsFromFixture } from "../src/checker/static-claim.js";
import type { Fixture } from "../src/fixtures/loader.js";

const mockFixture: Fixture = {
  id: "test-fixture-01",
  packageName: "is-odd",
  resolvedVersion: "3.0.1",
  integrity: "sha512-test",
  capturedAt: "2025-09-20T00:00:00.000Z",
  hasInstallScript: false,
  exportedSymbols: ["isOdd", "default"],
  exportsSource: "test fixture",
  claimedSymbols: ["isOddBatch"],
  expectedVerdict: "BLOCK",
  scenario: "Test: missing symbol",
};

describe("resolveClaimsFromFixture", () => {
  test("returns SYMBOL_MISSING for a symbol not in exports", () => {
    const result = resolveClaimsFromFixture(mockFixture, ["isOddBatch"]);
    expect(result.verdict).toBe("SYMBOL_MISSING");
    expect(result.symbolResults[0].status).toBe("missing");
    expect(result.symbolResults[0].symbol).toBe("isOddBatch");
  });

  test("returns SYMBOL_FOUND for a symbol that exists", () => {
    const result = resolveClaimsFromFixture(mockFixture, ["isOdd"]);
    expect(result.verdict).toBe("SYMBOL_FOUND");
    expect(result.symbolResults[0].status).toBe("found");
  });

  test("returns SYMBOL_MISSING when any symbol is missing", () => {
    const result = resolveClaimsFromFixture(mockFixture, ["isOdd", "isOddBatch"]);
    expect(result.verdict).toBe("SYMBOL_MISSING");
  });

  test("returns UNVERIFIED when no symbols are requested", () => {
    const result = resolveClaimsFromFixture(mockFixture, []);
    expect(result.verdict).toBe("UNVERIFIED");
  });

  test("includes fixture citations", () => {
    const result = resolveClaimsFromFixture(mockFixture, ["isOddBatch"]);
    expect(result.citations.some((c) => c.includes("test-fixture-01"))).toBe(true);
  });
});
