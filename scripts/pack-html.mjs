import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')
const vite = resolve(root, 'node_modules/.bin/vite')
const built = spawnSync(vite, ['build', '--config', 'vite.standalone.config.ts'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, VITE_STANDALONE: '1' },
})
if (built.status !== 0) process.exit(built.status || 1)

const dist = resolve(root, 'dist-standalone')
const jsPath = resolve(dist, 'app.js')
const cssPath = resolve(dist, 'app.css')
if (!existsSync(jsPath)) {
  console.error('standalone build did not emit app.js')
  process.exit(1)
}

const js = readFileSync(jsPath, 'utf8').replace(/<\/script/gi, '<\\/script')
const css = existsSync(cssPath) ? readFileSync(cssPath, 'utf8').replace(/<\/style/gi, '<\\/style') : ''

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="CivicAI offline — Understand documents. Find opportunities. Take action." />
    <meta name="theme-color" content="#16325c" />
    <meta name="color-scheme" content="light" />
    <title>CivicAI — Offline</title>
    <style>
      html,body,#root { min-height: 100%; margin: 0; background: #f3f5fa; color: #1f2937; }
      body { font-family: "Segoe UI", system-ui, sans-serif; }
      .boot { font-family: system-ui, sans-serif; padding: 48px 24px; text-align: center; color: #16325c; }
      .boot strong { display: block; font-size: 22px; margin-bottom: 8px; }
      ${css}
    </style>
  </head>
  <body>
    <div id="root">
      <div class="boot"><strong>CivicAI</strong>Opening the offline assistant…</div>
    </div>
    <noscript>
      <div class="boot"><strong>CivicAI</strong>Turn on JavaScript to use this offline file.</div>
    </noscript>
    <script>
      window.onerror = function (m) {
        var r = document.getElementById('root');
        if (r && !r.getAttribute('data-ready')) {
          r.innerHTML = '<div class="boot"><strong>CivicAI</strong>Could not start this offline file.<br/>' + String(m) + '</div>';
        }
      };
    </script>
    <script>
${js}
    </script>
  </body>
</html>
`

const targets = [resolve(root, 'CivicAI.html'), resolve(root, '..', 'CivicAI.html')]
for (const t of targets) writeFileSync(t, html)
console.log('Wrote', targets.join(' and '), `(${html.length} bytes)`)
