# CivicAI

**Your Legal & Government Assistant** — a Smart India Hackathon 2026 civic-tech app.

**Tagline:** From confusing documents to confident action.

CivicAI is a **document-to-action** platform, not a generic chatbot.

**UPLOAD / SEARCH → READ → UNDERSTAND → CHECK → EXPLAIN → RECOMMEND → AUTOMATE → ACT**

Guidance is **preliminary information**, not legal advice, not an official government decision, and not a guarantee of eligibility, illegality, or a court result. Always verify on official portals.

---

## Live demo

| | |
| --- | --- |
| **GitHub** | https://github.com/CoderDesai18/civicai |
| **Live app (GitHub Pages)** | https://coderdesai18.github.io/civicai/ |
| **Vercel** | Connect Vercel in this chat (or paste a Vercel token) to publish the full app with AI + Firebase. |
| **Offline file** | [`CivicAI.html`](./CivicAI.html) — same app, double-click, no server |

**Demo login (Open dashboard):** `demo@civicai.in` / `CivicAI@2026`

---

## What the app does

| Module | What you get |
| --- | --- |
| **Dashboard** | Pastel civic-tech shell: tiles, recent activity, readiness ring, EN / HI / MR |
| **Analyze** | PDF / photo / camera demos for scholarship, income, domicile, employment, loan, insurance |
| **Ask Indian Law** | Search Constitution, Acts, dictionary + AI explanation (live) or offline corpus |
| **Constitution** | Explorer built from *Constitution of India [As on 1st May, 2026]* (Legislative Department, up to 106th Amendment) |
| **Laws** | Published Act / section summaries with India Code links |
| **Schemes** | Rule-engine matching against myScheme / state portal metadata (not a decision) |
| **Rent checker** | Leave-and-licence / rent agreement walkthrough |
| **Missing docs / checklists / package** | What is present vs missing; document pack |
| **Generate / compare / evidence** | Templates, side-by-side, evidence trail |
| **Service desk / privacy / settings** | Prototype desk, session privacy, language and start page |
| **Auth** | Firebase email/password + Google (when configured) + CivicAI demo session |

Languages: **English, Hindi, Marathi**.

---

## Tech stack

### Frontend
- React 19 + TypeScript
- Vite 8 (SPA, host `0.0.0.0`, port **5173**)
- React Router 7
- Tailwind CSS v4
- Firebase Web SDK (Auth only)

### Backend (same repo)
- Vite middleware in development (`server/authPlugin.ts`, AI proxy)
- Vercel Serverless: `api/ai.js`, `api/auth/[...path].js`
- CivicAI sessions: scrypt password hashes, HMAC-SHA256 signed session ids, HttpOnly cookie + `Authorization: Bearer`
- Firebase ID token verify via Identity Toolkit `accounts:lookup`
- AI proxy: **DeepSeek first**, **Gemini fallback**. Keys stay on the server — never in browser code.

### Offline
- `npm run html` packs a single **IIFE** `CivicAI.html`
- HashRouter + guest user `CivicAI Guest`
- Ask Indian Law uses official Constitution text + Act summaries + dictionary (no live model)

---

## Algorithms / methods

1. **Document classify** — filename / demo-id lookup over curated analyses (prototype; not live OCR/Tesseract).
2. **Scheme match** — rule engine (`eq`, `lte`, `gte`, `in`, `truthy`); score = satisfied/total − 0.15 × misses. Output is **not** an eligibility decision.
3. **Ask Indian Law** — keyword search over articles, sections, dictionary, plus grounded FAQ overlay.
4. **Offline answers** — same corpus, including official article text as on **1 May 2026**.
5. **Passwords** — scrypt + per-user salt, timing-safe compare (prototype store).
6. **Sessions** — HMAC-SHA256 payload (`uid`, expiry, remember); idle ~30 min or 14 days if remembered.
7. **2FA** — TOTP (RFC 6238, SHA-1, 30s, ±1 window) + hashed recovery codes (prototype).
8. **Firebase** — client SDK → ID token → `POST /api/auth/firebase` → CivicAI session.
9. **AI routing** — DeepSeek → Gemini. Never invent Acts, sections, fees, deadlines, or official URLs. Never state definite eligibility.

---

## Project layout

```
civicai/
  api/                 Vercel functions (AI + auth)
  server/              Auth + AI core (used by Vite and Vercel)
  src/pages/           Dashboard, Analyze, Legal, Constitution, Schemes, Auth…
  src/data/            Constitution, laws, schemes, translations, demos
  src/services/        auth, firebaseAuth, AI, offline answers
  scripts/pack-html.mjs
  CivicAI.html         Offline single-file app
  vercel.json
  .env.example
```

---

## Run locally

```bash
git clone https://github.com/CoderDesai18/civicai.git
cd civicai
npm install
cp .env.example .env.local   # add keys (see below)
npm run dev
```

Open http://localhost:5173

```bash
npm run build      # production SPA
npm run html       # rebuild CivicAI.html
```

---

## Environment variables

Copy `.env.example` → `.env.local`. **Do not commit secrets.**

| Variable | Where | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` / `GEMINI_MODEL` | server | Gemini fallback (`gemini-3.6-flash`) |
| `DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` / `DEEPSEEK_BASE` | server | Primary AI |
| `VITE_FIREBASE_API_KEY` | client | Firebase web config (public; restrict by domain) |
| `VITE_FIREBASE_AUTH_DOMAIN` | client | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | client | Firebase project id |
| `VITE_FIREBASE_STORAGE_BUCKET` | client | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | client | Sender id |
| `VITE_FIREBASE_APP_ID` | client | App id |
| `FIREBASE_API_KEY` | server | Same web key, Identity Toolkit verify |
| `FIREBASE_PROJECT_ID` | server | Project id |

Firebase Console: enable **Email/Password** and **Google**. Add every host you use (localhost, Vercel domain, preview host) under **Authentication → Settings → Authorized domains**.

Without Firebase, **Open dashboard** still works with the demo account.

---

## Deploy on Vercel

1. Import https://github.com/CoderDesai18/civicai
2. Framework: Vite · build `npm run build` · output `dist`
3. Set the env vars above (including all `VITE_FIREBASE_*` **and** server `FIREBASE_*` / AI keys)
4. Add the `*.vercel.app` host to Firebase Authorized domains
5. Redeploy

API routes: `POST /api/ai`, `/api/auth/*`.

---

## Safety & official sources

CivicAI does **not** replace a lawyer, a court, or a government officer.

Verify on: [India Code](https://www.indiacode.nic.in/), [legislative.gov.in](https://legislative.gov.in/), [myScheme](https://www.myscheme.gov.in/), [DigiLocker](https://www.digilocker.gov.in/), [MahaDBT](https://mahadbt.maharashtra.gov.in/), [Aaple Sarkar](https://aaplesarkar.mahaonline.gov.in/), [National Scholarship Portal](https://scholarships.gov.in/).

Constitution text in the offline library is taken from the official Legislative Department publication **as on 1 May 2026**.

---

## Judge path (90 seconds)

1. Sign in with **Open dashboard**
2. Dashboard tile **Analyze** or **Try a demo**
3. Consent → start analysis → evidence + missing documents
4. **Ask Indian Law** → “What is Article 21?”
5. **Schemes** → run the questionnaire (results are not an eligibility decision)
6. Switch language EN / HI / MR in the header
7. **Privacy** / Settings

---

## License

Prototype for Smart India Hackathon 2026. Informational use only.
