# CivicAI — architecture summary

CivicAI is a document-to-action civic assistant (SIH 2026): upload/search → read → understand → check → explain → recommend → automate → act. Guidance is informational, not legal advice.

## Frontend
- **Stack:** React 19, TypeScript, Vite 8, React Router 7, Tailwind CSS v4
- **Shell:** sidebar + dashboard tiles, EN/HI/MR language switcher
- **Pages:** Dashboard, Analyze, Ask Indian Law, Constitution explorer, Laws, Schemes, Rent checker, Settings, Auth
- **Auth UI:** Firebase email/password + Google when configured; CivicAI demo login remains as “Open dashboard”
- **Offline HTML:** HashRouter, guest session, Constitution library answers (no live AI)

## Backend
- **Dev/preview:** Vite middleware (`server/handleAuth.ts`, `server/aiCore.ts`)
- **Auth:** CivicAI sessions (HMAC-signed, HttpOnly cookie + bearer) **and** Firebase ID token exchange (`POST /api/auth/firebase`)
- **AI proxy:** DeepSeek first, Gemini fallback (`POST /api/ai`). Keys stay on the server.
- **Users:** scrypt password hashes in `data/users.json` for the prototype store; Firebase users are upserted after token verify

## Libraries
| Area | Library |
| --- | --- |
| UI | react, react-dom, react-router-dom, tailwindcss |
| Build | vite, @vitejs/plugin-react, typescript |
| Auth | firebase (Auth), Identity Toolkit `accounts:lookup` on server |
| Crypto | Node `scrypt`, HMAC-SHA256 sessions, TOTP (SHA1 HMAC) for optional 2FA |
| AI | DeepSeek Chat Completions, Gemini generateContent |
| Docs | pypdf (ingest), Constitution JSON extracted from Legislative Department PDF |

## Algorithms / methods
1. **Document classify:** filename/demo-id lookup over curated analyses (not live OCR).
2. **Scheme match:** rule engine — operators `eq/lte/gte/in/truthy`; score = satisfied/total − 0.15×miss.
3. **Ask Indian Law search:** keyword/substring over Constitution articles, Acts/sections, dictionary; grounded FAQ overlay.
4. **Offline answers:** same corpus + official article text from *Constitution of India (as on 1 May 2026)*.
5. **Passwords:** scrypt (N default, 64-byte hash) with per-user salt; timing-safe compare.
6. **Sessions:** HMAC-SHA256 signed payload (uid, expiry, remember); optional cookie + `Authorization: Bearer`.
7. **2FA:** TOTP (RFC 6238, SHA-1, 30s, ±1 window) + hashed recovery codes.
8. **Firebase:** client SDK issues ID token; server verifies via Identity Toolkit lookup, then issues CivicAI session.
9. **AI routing:** try DeepSeek; on failure Gemini; never invent Acts/fees; refuse definite eligibility.

## Auth flow (Firebase)
Create account / Google → Firebase Auth → ID token → `POST /api/auth/firebase` → CivicAI session → dashboard.
