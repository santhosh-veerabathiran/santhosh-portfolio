# santhosh-portfolio

Personal portfolio site for **Santhosh Veerabathiran** — Full-Stack Software Engineer (Fintech & Payments).

A static site with a dark developer theme, teal accent, smooth-scroll sections (Hero · About · Work · Skills · Contact), an interactive particle-network hero, scroll-reveal animations, and a résumé download.

## Structure

```
.
├── index.html            # markup only
├── assets/
│   ├── css/style.css     # all styles
│   ├── js/main.js        # all interactions & animations
│   └── Santhosh_V_Resume.pdf
├── .prettierrc           # formatter config
├── .prettierignore
└── package.json          # format scripts
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Format

```bash
npm run format        # write
npm run format:check  # verify
```

Run `npm run format` before every push.

## Deploy

It's a static site — host the folder anywhere:

-   **Firebase Hosting:** `firebase init hosting` (public dir = this folder), then `firebase deploy`
-   **Netlify / Vercel:** drag-and-drop the folder, or connect the repo
-   **GitHub Pages:** push to a repo and enable Pages on the branch root

## Customise

Colors and fonts are CSS custom properties at the top of `assets/css/style.css`
(`--accent`, `--bg`, `--ink`, …). Content lives in the section markup in `index.html`.
