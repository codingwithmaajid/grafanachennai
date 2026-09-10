# Grafana Chennai Community Portal

Official community platform for **Grafana Chennai** — an open, developer-driven hub for observability, monitoring, and open-source infrastructure practitioners in Chennai, India.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Start Development Server](#3-start-development-server)
- [Available Scripts](#-available-scripts)
- [Project Architecture](#-project-architecture)
- [Customizing Assets & Mascot](#-customizing-assets--mascot)
- [Production Build & Deployment](#-production-build--deployment)
- [License](#-license)

---

## 🌐 Overview

Grafana Chennai is an open community bringing together engineers, SREs, platform teams, students, and open-source enthusiasts. This portal showcases upcoming and past meetups, talk proposals, RSVP management, speaker sign-ups, and community discussion channels.

---

## ✨ Key Features

- **Event Discovery & Schedules**: Filter and explore upcoming and past meetups, workshops, and hackathons with detailed agendas, speakers, and venue info.
- **Interactive RSVP System**: Complete RSVP flow with ticket confirmation and attendee counts.
- **Speaker CFP (Call For Proposals)**: Dedicated workflow for community members to pitch talks and lightning sessions.
- **Fluid Visual Identity**: Custom generative canvas gradient inspired by Grafana's signature orange, coral, and violet palette paired with the iconic Grot dinosaur mascot.
- **Direct Mascot Dropzone**: Interactive mascot component supporting instant drag-and-drop file replacement for custom community graphics (`images.png`).
- **Mobile-Responsive & Accessible**: Designed desktop-first with responsive layouts across mobile, tablet, and widescreen displays.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Fonts**: Inter & IBM Plex Mono via Google Fonts

---

## 📦 Prerequisites

Ensure you have one of the following runtimes installed on your machine:

- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm` (v9+), `pnpm`, `yarn`, or `bun`

Verify installation:
```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/grafana-chennai.git
cd grafana-chennai
```

### 2. Install Dependencies

Using **npm**:
```bash
npm install
```

Or using **bun**:
```bash
bun install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be accessible at:
```
http://localhost:3000/
```

> **Note**: The Vite dev server is pre-configured to bind to host `0.0.0.0` on port `3000`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite development server at `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and builds optimized production bundles in `dist/` |
| `npm run preview` | Locally serves the production build from `dist/` for inspection |
| `npm run lint` | Runs TypeScript static compiler verification (`tsc --noEmit`) |
| `npm run clean` | Removes build output directories (`dist/`) |

---

## 📂 Project Architecture

```plaintext
├── public/
│   ├── images.png           # Mascot raster image
│   ├── grot-mascot.svg      # High-definition vector mascot
│   └── grafana-logo.svg     # Official Grafana vector logo
├── src/
│   ├── components/
│   │   ├── AddEventForm.tsx       # Event creation form
│   │   ├── AddEventModal.tsx      # Modal container for event creation
│   │   ├── EventRow.tsx           # Standard event list item
│   │   ├── FluidHeroGradient.tsx  # Dynamic generative background canvas
│   │   ├── Footer.tsx             # Site footer with links & credits
│   │   ├── GetInvolvedModal.tsx   # CFP & volunteer modal
│   │   ├── GrafanaLogo.tsx        # Inline SVG logo component
│   │   ├── GrotMascot.tsx         # Stylized mascot rendering
│   │   ├── JoinModal.tsx          # Community channel links (WhatsApp, Slack)
│   │   ├── MascotDisplay.tsx      # Interactive mascot dropzone & loader
│   │   ├── Nav.tsx                # Primary site header and navigation
│   │   └── RSVPModal.tsx          # Event RSVP modal dialog
│   ├── data/
│   │   ├── events.ts              # Seed events and meetup data
│   │   └── eventHelpers.ts        # Filtering, date formatting & sorting utils
│   ├── pages/
│   │   ├── HomePage.tsx           # Landing page with hero & highlights
│   │   ├── EventsPage.tsx         # Complete events index with tabs & filters
│   │   ├── EventDetailPage.tsx    # Single event view with agenda & speakers
│   │   └── CommunityPage.tsx     # Guidelines, social links & CFP
│   ├── App.tsx                    # Root application component & routing state
│   ├── main.tsx                   # React DOM mount entry
│   ├── index.css                  # Tailwind CSS root imports
│   └── types.ts                   # Global TypeScript types and interfaces
├── index.html                     # HTML5 entry with SEO & OpenGraph meta tags
├── metadata.json                  # AI Studio project metadata configuration
├── package.json                   # Dependencies, engines & scripts
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler & Tailwind configuration
```

---

## 🎨 Customizing Assets & Mascot

- **Replace Mascot**:
  - Place your PNG file directly at `/public/images.png`.
  - Alternatively, in the browser interface, drag and drop any image directly onto Grot in the hero section to test live.
- **Events & Content**:
  - Edit `/src/data/events.ts` to add or update community events, speakers, locations, and schedules.

---

## 🚢 Production Build & Deployment

### Build for Production

```bash
npm run build
```

This compiles optimized assets into the `dist/` folder.

### Deployment Targets

- **Google Cloud Run**: Pre-configured for deployment with port 3000 container ingress.
- **Static Hosting (Vercel / Netlify / Cloudflare Pages / GitHub Pages)**:
  - Build command: `npm run build`
  - Publish directory: `dist`
- **Docker**:
  ```dockerfile
  FROM node:20-alpine AS build
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build

  FROM nginx:alpine
  COPY --from=build /app/dist /usr/share/nginx/html
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  ```

---

## 📄 License

This project is created for the **Grafana Chennai Community**. All Grafana logos and trademarks belong to [Grafana Labs](https://grafana.com/). Code is open source under the [MIT License](LICENSE).
