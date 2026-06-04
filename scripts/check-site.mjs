import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "favicon.svg",
  "site.webmanifest",
  "robots.txt",
  "CNAME",
  "README.md",
  ".github/workflows/pages.yml",
];

const secretPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bghp_[A-Za-z0-9_]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bcloudflared[a-z0-9_-]*token\b/i,
  /\b[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/,
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const read = (file) => readFileSync(join(root, file), "utf8");
const index = read("index.html");
const cname = read("CNAME").trim();

const requiredSnippets = [
  "<!doctype html>",
  '<html lang="ru">',
  '<meta name="description"',
  '<meta property="og:title"',
  '<meta property="og:description"',
  '<meta property="og:image"',
  '<meta name="twitter:card"',
  '<link rel="manifest"',
  "Great Hermes",
];

for (const snippet of requiredSnippets) {
  if (!index.includes(snippet)) {
    failures.push(`index.html does not contain required snippet: ${snippet}`);
  }
}

if (/(?:Рџ|Рђ|РЅ|Р°|Рё|Рґ|Рµ|Р»|Рѕ|СЂ|СЃ|СЏ|С‚|С‡|С‹|СЊ|СЋ|С‰)/.test(index)) {
  failures.push("index.html looks like it contains mojibake / broken Cyrillic.");
}

if (cname !== "thegreathermes.us") {
  failures.push(`CNAME must be thegreathermes.us, got: ${cname}`);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const path = join(dir, name);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      walk(path);
      continue;
    }
    if (stats.size > 1024 * 1024) continue;
    const rel = relative(root, path);
    const content = readFileSync(path, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        failures.push(`Possible secret pattern in ${rel}`);
      }
    }
  }
}

walk(root);

if (failures.length > 0) {
  console.error("Site checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Site checks passed.");
