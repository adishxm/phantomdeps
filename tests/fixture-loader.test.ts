/**
 * phantomdeps — fixture loader unit tests
 */

import { loadFixture } from "../src/fixtures/loader.js";

describe("loadFixture", () => {
  test("loads the is-odd-demo fixture", () => {
    const f = loadFixture("is-odd-demo");
    expect(f.id).toBe("is-odd-demo");
    expect(f.packageName).toBe("is-odd");
    expect(f.resolvedVersion).toBe("3.0.1");
    expect(f.exportedSymbols).toContain("isOdd");
    expect(f.claimedSymbols).toContain("isOddBatch");
    expect(f.expectedVerdict).toBe("BLOCK");
  });

  test("throws for a non-existent fixture", () => {
    expect(() => loadFixture("does-not-exist-xyz")).toThrow();
  });
});
