/**
 * phantomdeps — parser unit tests
 */

import { parseIntent, parseCheckArgs } from "../src/parser.js";

describe("parseIntent", () => {
  test("parses a bare package name", () => {
    const r = parseIntent("lodash");
    expect(r.name).toBe("lodash");
    expect(r.version).toBe("latest");
    expect(r.ecosystem).toBe("npm");
  });

  test("parses name@version", () => {
    const r = parseIntent("lodash@4.17.21");
    expect(r.name).toBe("lodash");
    expect(r.version).toBe("4.17.21");
  });

  test("parses scoped package", () => {
    const r = parseIntent("@types/node");
    expect(r.name).toBe("@types/node");
    expect(r.version).toBe("latest");
  });

  test("parses scoped package with version", () => {
    const r = parseIntent("@scope/pkg@1.2.3");
    expect(r.name).toBe("@scope/pkg");
    expect(r.version).toBe("1.2.3");
  });

  test("rejects shell metacharacters", () => {
    expect(() => parseIntent("pkg; rm -rf /")).toThrow("UNSAFE");
  });

  test("rejects URL forms", () => {
    expect(() => parseIntent("https://example.com/pkg.tgz")).toThrow("UNSUPPORTED");
  });

  test("rejects local path forms", () => {
    expect(() => parseIntent("../local-pkg")).toThrow();
  });
});

describe("parseCheckArgs", () => {
  test("parses package spec", () => {
    const opts = parseCheckArgs(["lodash@4.0.0"]);
    expect(opts.packageSpec).toBe("lodash@4.0.0");
    expect(opts.symbols).toEqual([]);
    expect(opts.offline).toBe(false);
  });

  test("parses --symbols flag", () => {
    const opts = parseCheckArgs(["lodash", "--symbols", "merge,cloneDeep"]);
    expect(opts.symbols).toEqual(["merge", "cloneDeep"]);
  });

  test("parses --offline flag", () => {
    const opts = parseCheckArgs(["lodash", "--offline"]);
    expect(opts.offline).toBe(true);
  });
});
