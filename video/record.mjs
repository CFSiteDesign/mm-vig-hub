/**
 * Records the hub walkthrough on a phone-sized screen, in step with the voiceover.
 *
 *   node video/record.mjs <vo_dir> <out_dir> [base_url]
 *
 * Needs the dev server running (npm run dev) and the voiceover made first
 * (video/make_vo.py). Frames are captured with Chrome's screencast, each with its
 * own timestamp, and every line's start time is logged, so build.py can lay the
 * voice in exactly where its caption appears.
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const [, , voDir, outDir, BASE = 'http://localhost:5203/'] = process.argv
if (!voDir || !outDir) throw new Error('usage: node video/record.mjs <vo_dir> <out_dir> [base_url]')

const script = JSON.parse(fs.readFileSync(new URL('./script.json', import.meta.url)))
const LINES = Object.fromEntries(script.lines.map((l) => [l.id, l]))
const { durations } = JSON.parse(fs.readFileSync(path.join(voDir, 'durations.json')))
const frameDir = path.join(outDir, 'frames')
fs.rmSync(frameDir, { recursive: true, force: true })
fs.mkdirSync(frameDir, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const now = () => Date.now() / 1000

/* ---------- on-page effects: captions, tap marker, spotlight, title cards ---------- */
const FX = () => {
  if (window.__fx) return
  const css = `
  #fx-cap{position:fixed;left:12px;right:12px;bottom:84px;z-index:2147483600;background:rgba(10,10,10,.94);color:#f5efe2;
    font:700 19px/1.32 Montserrat,system-ui,sans-serif;padding:14px 16px;border-radius:16px;box-shadow:4px 4px 0 #ccff01;
    transition:opacity .2s ease;opacity:0;text-align:left}
  #fx-cap.on{opacity:1}
  #fx-finger{position:fixed;left:0;top:0;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;z-index:2147483500;
    background:rgba(204,255,1,.32);border:3px solid #ccff01;pointer-events:none;opacity:0;
    transition:transform .5s cubic-bezier(.2,.7,.2,1),opacity .2s ease}
  .fx-ripple{position:fixed;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;border:3px solid #ccff01;z-index:2147483500;
    pointer-events:none;animation:fxr .55s ease-out forwards}
  @keyframes fxr{from{transform:scale(.5);opacity:1}to{transform:scale(2.4);opacity:0}}
  .fx-spot{position:absolute;z-index:2147483000;border:4px solid #ccff01;border-radius:22px;pointer-events:none;
    box-shadow:0 0 0 200vmax rgba(10,10,10,.55);opacity:0;transition:opacity .3s ease}
  .fx-spot.on{opacity:1}
  #fx-card{position:fixed;inset:0;z-index:2147483400;background:#0a0a0a;color:#f5efe2;display:flex;flex-direction:column;
    justify-content:center;padding:0 32px;transition:opacity .45s ease;font-family:Montserrat,system-ui,sans-serif}
  #fx-card img{width:150px;height:auto;margin-bottom:40px}
  #fx-card .e{font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#ccff01}
  #fx-card .t{font-size:54px;font-weight:900;line-height:.92;text-transform:uppercase;letter-spacing:-.02em;margin-top:14px}
  #fx-card .s{font-size:18px;font-weight:600;margin-top:22px;color:rgba(245,239,226,.72)}
  #fx-card .bar{display:flex;height:10px;border-radius:99px;overflow:hidden;margin-top:36px}
  #fx-card .bar span{flex:1}`
  const style = document.createElement('style')
  style.textContent = css
  document.documentElement.appendChild(style)

  const el = (tag, id) => Object.assign(document.createElement(tag), id ? { id } : {})
  let cap, finger, spot, card
  let fx = { x: window.innerWidth / 2, y: window.innerHeight + 40 }

  window.__fx = {
    caption(text) {
      cap ??= document.body.appendChild(el('div', 'fx-cap'))
      cap.textContent = text
      cap.classList.add('on')
    },
    async point(x, y) {
      finger ??= document.body.appendChild(el('div', 'fx-finger'))
      if (finger.style.opacity !== '1') {
        finger.style.transition = 'none'
        finger.style.transform = `translate(${fx.x}px,${fx.y}px)`
        finger.offsetWidth // restart from the last spot
        finger.style.transition = ''
      }
      finger.style.opacity = '1'
      finger.style.transform = `translate(${x}px,${y}px)`
      fx = { x, y }
      await new Promise((r) => setTimeout(r, 560))
      const ring = document.body.appendChild(el('div'))
      ring.className = 'fx-ripple'
      ring.style.left = x + 'px'
      ring.style.top = y + 'px'
      setTimeout(() => ring.remove(), 700)
    },
    lift() {
      if (finger) finger.style.opacity = '0'
    },
    spot(target, pad = 6) {
      const r = target.getBoundingClientRect()
      const s = document.body.appendChild(el('div'))
      s.className = 'fx-spot'
      Object.assign(s.style, {
        left: r.left + scrollX - pad + 'px',
        top: r.top + scrollY - pad + 'px',
        width: r.width + pad * 2 + 'px',
        height: r.height + pad * 2 + 'px',
      })
      requestAnimationFrame(() => s.classList.add('on'))
      spot?.remove()
      spot = s
    },
    unspot() {
      if (!spot) return
      const s = spot
      spot = null
      s.classList.remove('on')
      setTimeout(() => s.remove(), 320)
    },
    card(kind, logo) {
      card?.remove()
      card = document.body.appendChild(el('div', 'fx-card'))
      const bar = ['#ff01aa', '#00fef3', '#ccff01', '#ffc000', '#ff6600', '#ab00ff'].map((c) => `<span style="background:${c}"></span>`).join('')
      card.innerHTML =
        kind === 'intro'
          ? `<img src="${logo}" alt=""><div class="e">VIG &amp; GE Hub</div><div class="t">How to use<br>the hub</div><div class="s">A quick walkthrough</div><div class="bar">${bar}</div>`
          : `<img src="${logo}" alt=""><div class="e">VIG &amp; GE Hub</div><div class="t">All in.<br>Every property.<br>Every post.</div><div class="bar">${bar}</div>`
      card.style.opacity = '0'
      requestAnimationFrame(() => (card.style.opacity = '1'))
    },
    cardInstant(kind, logo) {
      this.card(kind, logo)
      card.style.transition = 'none'
      card.style.opacity = '1'
      card.offsetWidth
      card.style.transition = ''
    },
    hideCard() {
      if (!card) return
      const c = card
      card = null
      c.style.opacity = '0'
      setTimeout(() => c.remove(), 500)
    },
  }
}

/* ---------- browser ---------- */
// The flag makes headless Chrome's screencast send 2x frames (780x1688) for sharp text
const browser = await chromium.launch({ args: ['--force-device-scale-factor=2'] })
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  permissions: ['clipboard-read', 'clipboard-write'],
})
const page = await context.newPage()
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(FX)
await page.evaluate(() => document.fonts.ready)
const LOGO = await page.locator('img[alt="Mad Monkey"]').first().getAttribute('src')
const logoUrl = new URL(LOGO, BASE).href

const fxCall = (fn, ...args) => page.evaluate(([fn, args]) => window.__fx[fn](...args), [fn, args])

/** Scroll smoothly so the element's top sits `offset` px below the top of the screen */
async function scrollTo(locator, offset = 76, ms = 900) {
  const target = await locator.evaluate((el, offset) => el.getBoundingClientRect().top + scrollY - offset, offset)
  await page.evaluate(
    ([y, ms]) =>
      new Promise((res) => {
        const max = document.documentElement.scrollHeight - innerHeight
        const from = scrollY
        const to = Math.max(0, Math.min(max, y))
        const t0 = performance.now()
        const step = (t) => {
          const p = Math.min(1, (t - t0) / ms)
          const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
          window.scrollTo({ top: from + (to - from) * e, behavior: 'instant' })
          p < 1 ? requestAnimationFrame(step) : res()
        }
        requestAnimationFrame(step)
      }),
    [target, ms],
  )
}

async function tap(locator) {
  const box = await locator.boundingBox()
  if (!box) throw new Error('tap target not visible')
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await fxCall('point', x, y)
  await page.touchscreen.tap(x, y)
  await sleep(250)
}

const spot = (locator, pad) => locator.evaluate((el, pad) => window.__fx.spot(el, pad), pad ?? 6)

/* ---------- recording ---------- */
const frames = []
const cdp = await context.newCDPSession(page)
cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
  const file = path.join(frameDir, `f${String(frames.length).padStart(6, '0')}.jpg`)
  frames.push({ file: path.basename(file), t: metadata.timestamp })
  fs.writeFileSync(file, Buffer.from(data, 'base64'))
  cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
})

const timeline = []
const GAP = 380

/** Show a line's caption, start its voice clip, run its on-screen action alongside */
async function line(id, action, { after = 0 } = {}) {
  await fxCall('caption', LINES[id].caption)
  timeline.push({ id, start: now() })
  await Promise.all([action ? action() : null, sleep(durations[id] * 1000 + GAP + after)])
}

await fxCall('cardInstant', 'intro', logoUrl)
await sleep(300)
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 90, maxWidth: 780, maxHeight: 1688, everyNthFrame: 1 })
await sleep(500)
const videoStart = now()
await sleep(900)

// Welcome, over the title card
await line('welcome')
await line('one-link')
await line('how', async () => {
  await sleep(300)
  await fxCall('hideCard')
}, { after: 200 })

// Find your property
await line('find', () => scrollTo(page.locator('#find'), 70, 1100))
await line('tap-country', async () => {
  await tap(page.locator('#find button', { hasText: 'Cambodia' }))
  await sleep(700)
  await tap(page.locator('#prop-koh-rong'))
  await fxCall('lift')
}, { after: 300 })

// Property page
await line('page', () => spot(page.locator('main header'), 4))
await line('mine', async () => {
  await sleep(1300)
  await tap(page.getByRole('button', { name: /Make this my property/ }))
  await sleep(400)
  await fxCall('lift')
})
await line('local-time', () => spot(page.locator('main header p', { hasText: 'Local time' }), 8))

// WhatsApp
await line('whatsapp', async () => {
  await fxCall('unspot')
  await scrollTo(page.locator('#channels-title'), 70, 900)
  await spot(page.locator('main a', { hasText: 'WhatsApp Group' }).first(), 4)
})
await line('whatsapp-when', () => spot(page.locator('main a', { hasText: 'WhatsApp Group' }).first().locator('p', { hasText: '2pm' }), 8))

// Instagram
await line('instagram', async () => {
  await fxCall('unspot')
  const ig = page.locator('main a', { hasText: 'Instagram' }).first()
  await scrollTo(ig, 70, 900)
  await spot(ig, 4)
})
await line('login', () => spot(page.locator('main a', { hasText: 'Instagram' }).first().locator('p', { hasText: 'password manager' }), 8))

// Tools
await line('tools', async () => {
  await fxCall('unspot')
  await scrollTo(page.locator('#tools-title'), 50, 900)
})
await line('dashboard', () => spot(page.locator('main a', { hasText: 'Experience Dashboard' }).first(), 4))
await line('studio', () => spot(page.locator('main a', { hasText: 'MM Studio' }).first(), 4))

// Back home, down to the guides
await line('back', async () => {
  await fxCall('unspot')
  await scrollTo(page.locator('body'), 0, 700)
  await tap(page.locator('main a', { hasText: 'All properties' }))
  await fxCall('lift')
  await sleep(400)
  await scrollTo(page.locator('#shared'), 64, 1300)
})
await line('sop', () => spot(page.locator('#res-sop'), 4))
await line('playbook', async () => {
  await fxCall('unspot')
  await scrollTo(page.locator('#res-playbook'), 160, 700)
  await spot(page.locator('#res-playbook'), 4)
  await sleep(1800)
  await fxCall('unspot')
  await tap(page.locator('#res-playbook'))
  await fxCall('lift')
}, { after: 300 })

// Playbook: copy a template
await line('template', async () => {
  await sleep(200)
  await scrollTo(page.locator('#tpl-daily'), 70, 1300)
})
const firstCopy = page.locator('#templates article').first().locator('button', { hasText: 'Copy' })
await line('copy', async () => {
  await spot(page.locator('#templates article').first().locator('pre').locator('..'), 6)
  await sleep(500)
  await tap(firstCopy)
  await sleep(600)
  await fxCall('lift')
})

// Checklist
await line('checklist', async () => {
  await fxCall('unspot')
  await scrollTo(page.locator('#checklist ul'), 110, 1300)
  const boxes = page.locator('#checklist label')
  for (const i of [0, 1, 2]) {
    await tap(boxes.nth(i))
    await sleep(150)
  }
  await fxCall('lift')
}, { after: 600 })
await line('unclear', async () => {
  const callout = page.locator('#checklist div', { hasText: 'If anything is unclear' }).last()
  await scrollTo(callout, 300, 800)
  await spot(callout, 4)
})

// Outro: home, with "Your property" waiting at the top
await line('outro', async () => {
  await fxCall('unspot')
  await page.evaluate(() => (location.hash = '/'))
  await sleep(500)
  const mine = page.locator('main a', { hasText: 'Your property' })
  await scrollTo(mine, 220, 1200)
  await spot(mine, 4)
}, { after: 200 })
await line('bye', async () => {
  await fxCall('unspot')
  await fxCall('card', 'outro', logoUrl)
}, { after: 1400 })

await page.evaluate(() => document.getElementById('fx-cap')?.classList.remove('on'))
await sleep(500)
const videoEnd = now()
await sleep(300)
await cdp.send('Page.stopScreencast')
await browser.close()

fs.writeFileSync(
  path.join(outDir, 'timeline.json'),
  JSON.stringify({ videoStart, videoEnd, lines: timeline, frames }, null, 1),
)
console.log(`recorded ${frames.length} frames, ${(videoEnd - videoStart).toFixed(1)}s`)
