#!/usr/bin/env node
// Regenerate the single-language Bible-study PDFs from the source HTML.
//
// The /bible-study page embeds public/pre-conference-bible-study.html and its
// download buttons link to two pre-rendered PDFs (one per language). Those PDFs
// are static snapshots — run this after editing the study HTML so the downloads
// stay in sync.
//
//   node scripts/build-bible-study-pdf.mjs        (or: npm run pdf:bible)
//
// Uses headless Google Chrome's print-to-pdf. Each language is forced via the
// ?lang= query param the HTML already understands; the print CSS hides the topbar.

import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname } from 'node:path'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'public/pre-conference-bible-study.html')

const OUTPUTS = [
  { lang: 'en', file: '2026_PreConference_BibleStudy_EN.pdf' },
  { lang: 'fr', file: '2026_Etude_Biblique_PreConference_FR.pdf' },
]

// Locate a Chrome/Chromium binary across platforms (env override wins).
const CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].filter(Boolean)

const chrome = CANDIDATES.find((p) => existsSync(p))
if (!chrome) {
  console.error('Could not find a Chrome/Chromium binary. Set CHROME_PATH to override.')
  console.error('Tried:\n  ' + CANDIDATES.join('\n  '))
  process.exit(1)
}
if (!existsSync(SRC)) {
  console.error(`Source HTML not found: ${SRC}`)
  process.exit(1)
}

const srcUrl = pathToFileURL(SRC).href
console.log(`Chrome:  ${chrome}`)
console.log(`Source:  ${SRC}\n`)

for (const { lang, file } of OUTPUTS) {
  const out = resolve(ROOT, 'public', file)
  console.log(`Rendering ${lang.toUpperCase()} -> public/${file}`)
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--virtual-time-budget=8000', // let web fonts + JS lang toggle settle
      `--print-to-pdf=${out}`,
      `${srcUrl}?lang=${lang}`,
    ],
    { stdio: ['ignore', 'ignore', 'ignore'] }, // Chrome's GCM noise is harmless
  )
  if (!existsSync(out)) {
    console.error(`  FAILED — ${file} was not written`)
    process.exit(1)
  }
}

console.log('\nDone. Both PDFs regenerated in public/.')
