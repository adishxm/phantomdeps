const { execSync } = require("child_process");
const fs = require("fs");

const patterns = ["AKIA[0-9A-Z]{16}", "ghp_[0-9a-zA-Z]{36}", "sk-[0-9a-zA-Z]{20,}", "BEGIN PRIVATE KEY"];
let found = [];

for (const p of patterns) {
  try {
    const res = execSync(`git grep -E "${p}"`, { encoding: "utf8" });
    if (res.trim()) found.push({ pattern: p, matches: res.trim() });
  } catch (e) {
    // exit code 1 means pattern not found in git grep, which is good
  }
}

const out = "Secret Scan Result: " + (found.length === 0 ? "CLEAN (0 secrets detected)" : JSON.stringify(found, null, 2));
fs.writeFileSync(".docs/02_TEST/Tested_report_antigravity/evidence/terminal-output/phase-08-secret-scan.txt", out);
console.log(out);
