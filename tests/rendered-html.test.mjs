import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the wedding invitation shell and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Safa &amp; Ayaan/);
  assert.match(html, /Open the wedding invitation/);
  assert.match(html, /Nikah/);
  assert.match(html, /Walima/);
  assert.match(html, /Noor Palace/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
});

test("keeps invitation content centralized and accessible", async () => {
  const [page, data, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/invitation-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /lang="ar" dir="rtl"/);
  assert.match(page, /<time dateTime=/);
  assert.match(page, /<address>/);
  assert.match(page, /Add to calendar/);
  assert.doesNotMatch(page, /Discover our celebration|scroll-cue/);
  assert.match(data, /export const invitationData/);
  assert.match(layout, /1536, height: 1024/);
  assert.match(page, /hero-watercolor-backdrop\.webp/);
  assert.match(css, /\.hero-art[^}]*object-fit:contain/);
  assert.doesNotMatch(css, /\.hero-art\s*\{[^}]*object-fit:cover/);
  assert.match(css, /max-aspect-ratio:2\/3/);
  assert.match(css, /\.hero-art-stage\{place-items:start center/);
  assert.match(css, /safe-area-inset-top/);
  assert.match(css, /--details-gutter:clamp\(1rem,4\.5vw,1\.5rem\)/);
  assert.match(css, /\.details:after\{[^}]*position:absolute/);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /grid-template-columns:minmax\(0,1fr\)/);
});

test("declares an explicit Vercel deployment target", async () => {
  const [vercel, packageJson] = await Promise.all([
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  const config = JSON.parse(vercel);
  const packageData = JSON.parse(packageJson);
  assert.equal(config.framework, "nextjs");
  assert.equal(config.buildCommand, "npm run build:vercel");
  assert.equal(packageData.scripts["build:vercel"], "next build");
  assert.match(packageData.dependencies.next, /^\^?16\./);
});
