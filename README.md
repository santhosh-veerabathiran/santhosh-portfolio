<div align="center">

![Portfolio preview](public/assets/images/og-image.png)

# 🌊 Santhosh Veerabathiran — Portfolio

**Full-Stack Software Engineer · Fintech &amp; Payments**

[![Live Site](https://img.shields.io/badge/Live-portfolio.santhosh--veerabathiran.com-2dd4bf?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://portfolio.santhosh-veerabathiran.com/)
&nbsp;
[![Résumé](https://img.shields.io/badge/R%C3%A9sum%C3%A9-PDF-0f766e?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](public/assets/resumes/santhosh-resume.pdf)

<br />

![React](https://img.shields.io/badge/React_19-0b1416?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-0b1416?style=flat-square&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-0b1416?style=flat-square&logo=vite&logoColor=646CFF)
![CSS3](https://img.shields.io/badge/CSS3-0b1416?style=flat-square&logo=css3&logoColor=1572B6)
![Canvas](https://img.shields.io/badge/Canvas-0b1416?style=flat-square&logo=html5&logoColor=2dd4bf)
![Prettier](https://img.shields.io/badge/Prettier-0b1416?style=flat-square&logo=prettier&logoColor=F7B93E)

</div>

---

## ✨ Overview

A multi-template developer portfolio built with **React 19 + Vite + TypeScript**. Every template renders
the same typed content, so the information lives in exactly one place — the designs live in many.

> 🔗 **Live:** https://portfolio.santhosh-veerabathiran.com/

## 🧩 Templates & skins

Two different concepts, cleanly separated:

- **Templates** are whole documents with their own URL, Vite entry and static head (own social-share
  preview). The **classic** template lives at the root `/`; **[minato](src/templates/minato/README.md)**
  lives at `/minato/`. A future completely-different template is a new shell + entry + layout, and costs
  the other templates nothing.
- **Skins** are design variants of the classic template only, selected with `?theme=<id>` on the root —
  random when absent, unknown values fall back to random. A skin is one JSON of design tokens +
  background/effect config; adding one is a JSON file in `src/templates/classic/skins/` registered in
  `src/templates/classic/skin.registry.ts`.

| Skin    | Feel                            | Try               |
| ------- | ------------------------------- | ----------------- |
| Marine  | teal · particle network         | `/?theme=marine`  |
| Sunset  | warm orange · aurora            | `/?theme=sunset`  |
| Violet  | purple · starfield              | `/?theme=violet`  |
| Mono    | grayscale serif · contour waves | `/?theme=mono`    |
| Crimson | deep red · falling petals       | `/?theme=crimson` |
| Ember   | gold serif · rising embers      | `/?theme=ember`   |

## 🎬 Features

- 🌌 **Canvas hero** per skin — particle network, starfield, embers, petals or contour waves, all cursor-reactive
- ⌨️ **Typewriter** headline + staggered **letter reveal**, count-up stats, live tenure
- 🪄 **3D-tilt cards** with cursor-tracking glow, **magnetic** CTAs, page **spotlight**
- 🎞️ **Scroll-reveal** sections, seamless **tech marquee**, scroll-progress bar
- 🎥 **Minato template**: scroll-scrubbed frame sequences, pointer-tracked sphere, sweep-to-reveal contact
- 🧠 Dynamic per-template **head** — title, description, JSON-LD, and a favicon tinted by the active skin
- ♿ Fully **`prefers-reduced-motion`** aware and mobile-responsive

## 🗂️ Structure

```text
santhosh-portfolio/
├── index.html                     # classic document shell (crawler defaults)
├── minato/index.html              # minato document shell
├── public/
│   ├── assets/classic/            # classic skin art (crimson.svg, ember.svg)
│   ├── assets/minato/             # minato frames + art plates
│   ├── assets/images/             # og-image
│   └── assets/resumes/            # résumé (html + pdf)
└── src/
    ├── content/                   # single source of truth: profile, work, projects, skills, seo
    ├── lib/                       # shared runtime + hooks (skins, head, motion, observers)
    └── templates/
        ├── classic/               # default template (/) — layout, sections, effects, skins/
        └── minato/                # cinematic template (/minato/) — see its README
```

## 🚀 Development

```bash
npm install
npm run dev       # http://localhost:5173 (and /minato/)
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## 🧹 Format

```bash
npm run format         # write   (Prettier — tabs, single quotes)
npm run format:check   # verify
```

> Run `npm run format` before every push.

## 🌐 Deploy

**Cloudflare Pages**, Git-connected to `main` — build command `npm run build`, output directory `dist`.
Security headers ship via `public/_headers`.

## 📬 Contact

[![Email](https://img.shields.io/badge/Email-santhosh20020923@gmail.com-2dd4bf?style=flat-square&logo=gmail&logoColor=white)](mailto:santhosh20020923@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-santhosh--veerabathiran-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/santhosh-veerabathiran)
[![GitHub](https://img.shields.io/badge/GitHub-santhosh--veerabathiran-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/santhosh-veerabathiran)

<div align="center"><sub>© 2026 Santhosh Veerabathiran</sub></div>
