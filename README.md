# CivicAI

Citizen-first government and legal document assistant for Smart India Hackathon 2026.

**Tagline:** From confusing documents to confident action.

Workflow: **UPLOAD → EXTRACT → VERIFY → UNDERSTAND → CHECK → RECOMMEND → ACT**

## Run

```bash
cd civicai
npm install
npm run dev
```

The prototype is fully demoable without API keys.

## Judge path (90 seconds)

1. Home → **Try demo document**
2. Tick consent → **Start analysis**
3. Confirm a field, **View evidence**, mark the missing income certificate
4. Scroll **Evidence trail** and scheme matches
5. **Understand a law** → sample question on personal data misuse
6. **Privacy centre** → delete session

## Safety

Guidance is preliminary. CivicAI does not issue official decisions, guarantee eligibility, or provide legal advice. Official sources: myScheme, DigiLocker, India Code, MahaDBT, Aaple Sarkar, National Scholarship Portal.

## Stack

React + TypeScript + Vite + Tailwind CSS + React Router. Modular data files for schemes, laws, documents, and translations (English / Hindi / Marathi).
