<div align="center">

# HACKER HOUSE GOA '26

### TASK #1 · BUILDER ID & TEAM FRAME GENERATOR

**UPLOAD → BUILD YOUR IDENTITY → SHARE**

[![HH Goa 2026](https://img.shields.io/badge/HACKER%20HOUSE-GOA%20'26-0B6B3A?style=for-the-badge&labelColor=FFE500)](https://hhgoa.com/)
[![Open Trial](https://img.shields.io/badge/OPEN%20TRIAL-TASK%20%231-FF2A8A?style=for-the-badge)](https://hhgoa.com/)
[![React](https://img.shields.io/badge/React-19-0B6B3A?style=for-the-badge&logo=react&logoColor=FFE500)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-FF2A8A?style=for-the-badge&logo=vite&logoColor=F7F0D0)](https://vite.dev/)
[![Deploy](https://img.shields.io/badge/DEPLOYED-VERCEL-0B6B3A?style=for-the-badge&logo=vercel&logoColor=FFE500)](https://vercel.com/)

**[LIVE DEMO → task1-six-nu.vercel.app](https://task1-six-nu.vercel.app/)**

</div>

---

## THE TASK

Build a web tool where a user uploads a photo and instantly gets a branded Hacker House Goa 2026 graphic ready to download and share on X.

The brief allows a **PFP Frame / Overlay** or a **Builder ID Card**. This implementation supports the Builder ID flow and extends it with a combined **2–3 builder Team Frame** flow. The required path is:

```text
UPLOAD
  ↓
PERSONALIZE
  ↓
GENERATE
  ↓
PREVIEW
  ↓
DOWNLOAD / SHARE TO X
```

The official brief calls for common image formats including JPG, PNG and HEIC, fast generation, handling varied photo aspect ratios, a real downloadable image file, a working X share flow with `#FrameInGoa`, and mobile-friendly use.

---

## WHAT I BUILT

### 01 · BUILDER ID

A single photo becomes a personalized Hacker House Goa builder identity.

**Inputs**

- Photo
- Name
- Role
- Tech stack

**Generated output**

- Builder Persona / Class
- Unique Builder ID
- Branded identity graphic
- Downloadable PNG
- Pre-filled X sharing flow

### 02 · TEAM FRAME

The app also supports a combined frame for **2 or 3 builders**.

Each builder contributes:

- Name
- Photo

The renderer combines them into one shareable HH Goa themed graphic.

### 03 · SMART BUILDER PERSONA

Role + stack are mapped into themed Builder Classes:

| Area | Builder Class |
|---|---|
| Cybersecurity | **BUG WHISPERER** |
| AI / ML | **MODEL TAMER** |
| DevOps / Cloud | **PIPELINE PILOT** |
| Data | **DATA EXPLORER** |
| Mobile | **MOBILE CRAFTER** |
| Web3 / Blockchain | **CHAIN BUILDER** |
| Full Stack | **STACK FORGER** |
| Backend | **SYSTEM BUILDER** |
| Frontend | **PIXEL ARCHITECT** |

Role matches receive stronger weight than stack-only matches, with priority rules used for ties.

---

## ARCHITECTURE

```text
                         USER
                          │
                          ▼
                 ┌─────────────────┐
                 │  PhotoUploader  │
                 └────────┬────────┘
                          │
                    JPG / PNG / HEIC
                          │
                          ▼
                 ┌─────────────────┐
                 │ Identity Form   │
                 │ Name / Role /   │
                 │ Tech Stack      │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Persona Engine  │
                 │ Class + Category│
                 └────────┬────────┘
                          │
                 ┌────────┴────────┐
                 │                 │
                 ▼                 ▼
          Builder Renderer    Team Renderer
          Individual ID       2–3 Builder Frame
                 │                 │
                 └────────┬────────┘
                          ▼
                 ┌─────────────────┐
                 │    PNG Output   │
                 └────────┬────────┘
                          │
                   ┌──────┴──────┐
                   ▼             ▼
               DOWNLOAD       SHARE TO X
```

The core image-generation flow runs client-side. No custom backend, database, or login is required.

---

## TECH STACK

| Technology | Role |
|---|---|
| **React 19** | UI and state |
| **Vite 8** | Build tooling |
| **HTML Canvas API** | Builder ID + team-frame rendering |
| **heic-to** | Browser-side HEIC conversion |
| **CSS** | Responsive layout, theme, interactions and animation |
| **Vercel** | Deployment |

---

## PROJECT STRUCTURE

```text
src/
├── App.jsx
├── App.css
├── canvas/
│   ├── renderer.js
│   └── teamRenderer.js
├── components/
│   └── PhotoUploader.jsx
└── utils/
    ├── builderId.js
    ├── personaEngine.js
    └── titleGenerator.js
```

### Key modules

| Module | Responsibility |
|---|---|
| `src/canvas/renderer.js` | Individual Builder ID renderer |
| `src/canvas/teamRenderer.js` | 2–3 builder team composition |
| `src/utils/personaEngine.js` | Role + stack → Builder Persona |
| `src/utils/builderId.js` | HH26 Builder ID generation |
| `src/components/PhotoUploader.jsx` | Selection, validation, preview and HEIC conversion |

---

## RUN LOCALLY

### Requirements

- Node.js
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## VISUAL SYSTEM

The product follows the visual language of Hacker House Goa 2026:

| Brand element | Used as |
|---|---|
| **Goa green** | Primary structural colour |
| **Electric yellow** | Headlines, accents and selection states |
| **Hot pink** | Secondary accent |
| **Cream** | Typography and soft surfaces |
| **Poster / event-pass language** | Builder identity cards |
| **Goa motifs** | Sun / palm / beach-inspired details |

The identity hierarchy stays intentionally direct:

```text
PHOTO
  ↓
NAME
  ↓
ROLE
  ↓
BUILDER CLASS
  ↓
TECH STACK
  ↓
BUILDER ID
```

---

## SHARE FLOW

The generated result can be downloaded as a PNG and shared through the X flow.

The pre-filled share text includes `#FrameInGoa` and `#HackerHouseGoa` together with the live generator URL.

---

## HH GOA 2026 · OPEN TRIAL

**Task #1 — Builder ID & Team Frame Generator**

**Live:** https://task1-six-nu.vercel.app/  
**Repository:** https://github.com/codebynv/task1

Built for the Hacker House Goa 2026 Open Trials.

---

<div align="center">

### BUILD · SHIP · LAUNCH

**HACKER HOUSE GOA 2026**

[hhgoa.com](https://hhgoa.com/) · [@codebynv](https://github.com/codebynv)

</div>
