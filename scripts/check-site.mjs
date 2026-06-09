import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "favicon.svg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  "README.md",
  "ROADMAP.md",
  ".github/workflows/pages.yml",
];

const textExtensions = new Set([
  "",
  ".html",
  ".svg",
  ".json",
  ".webmanifest",
  ".txt",
  ".xml",
  ".md",
  ".yml",
  ".yaml",
  ".mjs",
]);

const secretPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bghp_[A-Za-z0-9_]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bcloudflared[a-z0-9_-]*token\b/i,
  /\b[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/,
];

const mojibakeFragments = [
  "\u0420\u040f",
  "\u0420\u0098",
  "\u0420\u0458",
  "\u0420\u045a",
  "\u0420\u040e",
  "\u0420\u0409",
  "\u0421\u201a",
  "\u0421\u0403",
  "\u0421\u040f",
  "\u0421\u0452",
  "\u0421\u2030",
  "\u0421\u0458",
  "\u0421\u0453",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const read = (file) => readFileSync(join(root, file), "utf8");
const index = read("index.html");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
const manifest = read("site.webmanifest");
const cname = read("CNAME").trim();
const publicUrl = "https://thegreathermes.us/";

const requiredSnippets = [
  "<!doctype html>",
  '<html lang="ru">',
  '<meta name="viewport"',
  '<meta name="description"',
  '<meta property="og:title"',
  '<meta property="og:description"',
  '<meta property="og:image"',
  '<meta name="twitter:card"',
  '<link rel="canonical"',
  '<link rel="manifest"',
  "Great Hermes",
  "Меньше рутины. Больше завершённой работы",
  "Подробности продукта пока остаются внутри команды",
  "Практический результат",
  "Естественный опыт",
  "Контроль человека",
  "Мы покажем больше, когда продукт будет к этому готов",
  ":focus-visible",
  'class="skip-link"',
  'class="brand" href="/"',
];

for (const snippet of requiredSnippets) {
  if (!index.includes(snippet)) {
    failures.push(`index.html does not contain required snippet: ${snippet}`);
  }
}

const forbiddenSnippets = [
  "Не ещё один чат с ИИ",
  "Главная роль Hermes",
  "Публичные точки проекта",
  "GitHub repository",
  "Live preview",
  "Primary domain",
  "мобильный клиент",
  "мессенджер",
  "между устройствами",
  "единый контекст",
  "рабочие инструменты",
  "Пример целевого сценария",
  "Запрос подтверждения",
  "Клиенты и инфраструктура",
  "Продуктовые репозитории",
];

for (const snippet of forbiddenSnippets) {
  if (index.includes(snippet)) {
    failures.push(`index.html contains obsolete or forbidden snippet: ${snippet}`);
  }
}

if (!index.includes(publicUrl) || !robots.includes(publicUrl) || !sitemap.includes(publicUrl)) {
  failures.push("Canonical public URL is not synchronized across index, robots and sitemap");
}

if (cname !== "thegreathermes.us") {
  failures.push(`CNAME must be thegreathermes.us, got: ${cname}`);
}

if (!manifest.includes("Новый подход к работе с искусственным интеллектом")) {
  failures.push("Web manifest description is not aligned with current positioning");
}

if (!manifest.includes('"start_url": "/"') || !manifest.includes('"src": "/favicon.svg"')) {
  failures.push("Web manifest must use root-relative paths for the custom domain");
}

const externalLinks = [...index.matchAll(/<a\b([^>]*\btarget="_blank"[^>]*)>/g)];
for (const [, attributes] of externalLinks) {
  if (!/\brel="[^"]*\bnoreferrer\b[^"]*"/.test(attributes)) {
    failures.push("External target=_blank link is missing rel=noreferrer");
  }
}

const ids = [...index.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  failures.push(`Duplicate HTML ids: ${[...new Set(duplicateIds)].join(", ")}`);
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
    const ext = extname(path);
    if (!textExtensions.has(ext)) continue;

    const content = readFileSync(path, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        failures.push(`Possible secret pattern in ${rel}`);
      }
    }
    for (const fragment of mojibakeFragments) {
      if (content.includes(fragment)) {
        failures.push(`Possible mojibake / broken Cyrillic in ${rel}`);
        break;
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
