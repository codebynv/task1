# Hacker House Goa 2026 — Builder ID & Team Frame Generator

> Create a personalized Hacker House Goa 2026 Builder ID from your photo, or combine 2–3 builders into a shareable team frame.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-task1--six--nu.vercel.app-0b6b3a?style=for-the-badge)](https://task1-six-nu.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

## ✦ Live Demo

**https://task1-six-nu.vercel.app/**

Upload a photo, enter your identity, choose your stack, and generate a Hacker House Goa themed Builder ID in seconds.

---

## 🎯 What It Does

### Builder ID

- Upload **JPG, PNG, or HEIC** photos.
- Enter **name, role, and tech stack**.
- Automatically generate a Hacker House style **Builder Persona / Class**.
- Generate a unique **Builder ID**.
- Render the final identity card as a real **PNG** in the browser.
- Download the generated card instantly.
- Open a pre-filled **X post** with the Builder/Team caption, hashtags, and live app URL.

### Team Frame

- Choose **2 or 3 builders**.
- Add a name and photo for each builder.
- Generate a combined Hacker House Goa team frame.
- Download the result as PNG.
- Share the result through the X flow.

---

## ✨ Smart Builder Persona Engine

The app maps role + stack combinations into themed Builder Classes.

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

The persona engine gives stronger weight to role matches than stack-only matches and uses rule priority to resolve ties. 

---

## 🛠 Tech Stack

- **React 19** — application UI and state
- **Vite 8** — development and production build tooling
- **HTML Canvas API** — client-side Builder ID and team-frame rendering
- **HEIC support** — browser-side conversion with `heic-to`
- **CSS** — responsive layout, theme, interactions, and animations
- **Vercel** — production deployment

The core generation flow does not require a backend, database, or login.

---

## 🧩 Architecture

```text
                    USER PHOTO
                        │
                        ▼
               ┌─────────────────┐
               │  PhotoUploader  │
               └────────┬────────┘
                        │
                  JPG / PNG / HEIC
                        │
                        ▼
              ┌────────────────────┐
              │   Identity Form    │
              │ Name / Role /      │
              │ Tech Stack         │
              └─────────┬──────────┘
                        │
                        ▼
              ┌────────────────────┐
              │ Persona Engine     │
              │ Persona + Category │
              └─────────┬──────────┘
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
      Builder Renderer      Team Renderer
      Individual ID         2–3 Builder Frame
              │                   │
              └─────────┬─────────┘
                        ▼
               ┌─────────────────┐
               │   PNG Output    │
               └───────┬─────────┘
                       │
                ┌──────┴──────┐
                ▼             ▼
            Download       Share to X
```

---

## 📁 Project Structure

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

**`src/canvas/renderer.js`**  
Renders the individual Builder ID card using Canvas.

**`src/canvas/teamRenderer.js`**  
Renders 1–3 builder team compositions with the HH Goa visual system.

**`src/utils/personaEngine.js`**  
Scores role and stack keywords and returns the strongest Builder Persona + category.

**`src/utils/builderId.js`**  
Creates Builder IDs with an HH26 prefix, initials, and a four-digit numeric suffix.

**`src/components/PhotoUploader.jsx`**  
Handles photo selection, validation, preview, and HEIC conversion.

---

## 🚀 Run Locally

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

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 📱 User Flow

```text
Upload
  ↓
Personalize
  ↓
Generate
  ↓
Preview
  ↓
Download / Share
```

The UI is responsive for desktop and mobile. Generated images are independent of the page layout and can be downloaded as PNGs.

The X action opens a pre-filled post containing the generated Builder/Team caption, `#FrameInGoa`, `#HackerHouseGoa`, and the live generator URL.

---

## 🎨 Visual Direction

The product follows the Hacker House Goa visual language:

- Deep Goa green
- Electric yellow
- Hot pink accents
- Cream typography
- Sun and palm motifs
- Event-pass / poster-inspired framing
- Responsive animated UI

The individual Builder ID hierarchy is intentionally clear:

**Photo → Name → Role → Builder Class → Stack → Builder ID**

---

## 🔒 Processing

The core image generation flow is client-side. Photos are used in the browser to create the generated PNG and the core flow does not depend on a custom application database or user account.

---

## 🌴 Hacker House Goa 2026

Built for the **Hacker House Goa 2026 Frame / ID Card Generator** task.

**Build · Ship · Launch**

`#FrameInGoa` `#HackerHouseGoa`

---

## 👨‍💻 Author

**Nirav Vala**  
GitHub: [@codebynv](https://github.com/codebynv)

Project: [github.com/codebynv/task1](https://github.com/codebynv/task1)

Live: [task1-six-nu.vercel.app](https://task1-six-nu.vercel.app/)
