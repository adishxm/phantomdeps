/**
 * phantomdeps — argv parser
 * Parses "npm install"-shaped argv without shell evaluation.
 * Only registry-name specs are supported. Everything else → UNVERIFIED.
 */

import type { InstallIntent } from "./types.js";

/** Supported npm install/add forms: name, name@version, @scope/name@version */
const REGISTRY_SPEC_RE = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(@[^\s]+)?$/i;

/** Shell metacharacters that must never appear in a safe package spec */
const SHELL_META_RE = /[;&|`$<>()\{\}\[\]\\'"]/;

/** npm alias/protocol forms that are not supported */
const PROTOCOL_RE = /^(npm:|file:|git\+|github:|gitlab:|bitbucket:|https?:|ssh:)/i;

/** npm registry names are capped at 214 characters */
const MAX_NAME_LENGTH = 214;

export interface CheckOptions {
  packageSpec: string;
  symbols: string[];
  offline: boolean;
}

export function parseCheckArgs(args: string[]): CheckOptions {
  const opts: CheckOptions = { packageSpec: "", symbols: [], offline: false };
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (arg === "--symbols" || arg === "-s") {
      const raw = args[++i] ?? "";
      opts.symbols = raw.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (arg === "--offline") {
      opts.offline = true;
    } else if (!arg.startsWith("--")) {
      opts.packageSpec = arg;
    }
    i++;
  }
  return opts;
}

/**
 * Parse a registry package spec into name + version.
 * Throws if the spec contains shell metacharacters or unsupported forms.
 */
export function parseIntent(spec: string): InstallIntent {
  if (SHELL_META_RE.test(spec)) {
    throw new Error(
      `UNSAFE: package spec contains shell metacharacters: ${spec}`
    );
  }

  if (PROTOCOL_RE.test(spec)) {
    throw new Error(
      `UNSUPPORTED: '${spec}' uses a protocol/alias form. ` +
      `Only registry-name specs are supported in v1.`
    );
  }

  // Strip the version part for length check on the name portion
  const namePart = spec.startsWith("@")
    ? spec                          // length check on full scoped name
    : spec.split("@")[0];
  if (namePart.length > MAX_NAME_LENGTH) {
    throw new Error(
      `UNSUPPORTED: package name exceeds the npm maximum of ${MAX_NAME_LENGTH} characters.`
    );
  }

  if (!REGISTRY_SPEC_RE.test(spec)) {
    throw new Error(
      `UNSUPPORTED: '${spec}' is not a registry-name spec. ` +
      `URLs, VCS refs, local paths, and aliases are not supported in v1.`
    );
  }

  // Split name@version — handle scoped packages @scope/name@version
  let name: string;
  let version = "latest";

  if (spec.startsWith("@")) {
    // @scope/name or @scope/name@ver
    const slashIdx = spec.indexOf("/");
    const rest = spec.slice(slashIdx + 1);
    const atIdx = rest.indexOf("@");
    if (atIdx === -1) {
      name = spec;
    } else {
      name = spec.slice(0, slashIdx + 1 + atIdx);
      version = rest.slice(atIdx + 1);
    }
  } else {
    const atIdx = spec.indexOf("@");
    if (atIdx === -1) {
      name = spec;
    } else {
      name = spec.slice(0, atIdx);
      version = spec.slice(atIdx + 1);
    }
  }

  return {
    ecosystem: "npm",
    name: name.toLowerCase(),
    version,
    rawArgv: [spec],
  };
}
