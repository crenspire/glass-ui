// Migrates old glass variant names to the liquid material API.
// Usage: node scripts/codemod-liquid.mjs <dir|file>...
// Directories named `ui` are skipped, so component sources are never rewritten.
import fs from "node:fs"
import path from "node:path"

const DROP = ["glass", "glassSubtle", "frosted"]
const CLEAR = ["crystal", "fluted"]
const rules = [
  // JSX attributes
  [new RegExp(`\\s+variant=["'](?:${DROP.join("|")})["']`, "g"), ""],
  [new RegExp(`variant=(["'])(?:${CLEAR.join("|")})\\1`, "g"), 'material="clear"'],
  [/variant=(["'])glassSolid\1/g, 'material="tinted"'],
  // Storybook args objects
  [new RegExp(`^\\s*variant:\\s*["'](?:${DROP.join("|")})["'],?\\n`, "gm"), ""],
  [new RegExp(`variant:\\s*(["'])(?:${CLEAR.join("|")})\\1`, "g"), "material: 'clear'"],
  [/variant:\s*(["'])glassSolid\1/g, "material: 'tinted'"],
  // Raw classes outside components/ui
  [/(?<![\w:-])glass-(?:bg|frosted)(?![\w-])/g, "lg lg-regular lg-surface"],
  [/(?<![\w:-])glass-(?:crystal|fluted)(?![\w-])/g, "lg lg-clear lg-surface"],
]

function walk(p, out) {
  const st = fs.statSync(p)
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(p)) if (f !== "node_modules" && f !== "ui") walk(path.join(p, f), out)
  } else if (/\.(tsx?|mdx?)$/.test(p)) out.push(p)
  return out
}

let changed = 0
for (const f of process.argv.slice(2).flatMap(a => walk(a, []))) {
  const src = fs.readFileSync(f, "utf8")
  const next = rules.reduce((s, [re, to]) => s.replace(re, to), src)
  if (next !== src) { fs.writeFileSync(f, next); changed++; console.log("updated", f) }
}
console.log(`${changed} files updated`)
