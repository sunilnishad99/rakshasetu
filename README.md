# RakshaSetu — Multi-Hazard Early Warning System

A responsive, mobile-first disaster early-warning app concept, built in response to the recent flooding in Nepal. It is **not limited to floods** — it covers flood, landslide, earthquake, fire, and storm alerts in one place, with login/register, a user profile with photo upload, dark/light mode, and section-based navigation (Home / Map / Alerts / Profile).

Built with **React + TypeScript + Vite**. No backend — all hazard/shelter data is mocked in `src/data/mockData.ts`, and auth is a demo-only client-side system stored in the browser's `localStorage` (see the note in "Auth" below).

## Features

- **Login & Register** — required before entering the app; each account has a name, email, phone, and profile photo.
- **Profile** — tap the avatar (top bar or Profile tab) to upload/change a photo, edit name and phone, switch theme, and log out.
- **Dark / light mode** — toggle from the top bar or Profile tab; preference is remembered.
- **Section navigation, not scrolling** — Home, Map, Alerts, and Profile are separate sections switched via the nav (sidebar on desktop, bottom bar on mobile). On a laptop-sized screen the whole app fits in the viewport without page-level scrolling; you navigate between sections instead.
- **Multi-hazard alerts** — flood, landslide, earthquake, fire, and storm events, each with severity (safe / watch / danger), distance, and details.
- **Live-style flood risk** — uses your device's GPS distance to a reference river point to simulate a real-time flood risk level (with a "Simulate nearby flood" demo button if you'd rather not grant location access).
- **Map view** — hazard markers with type filters, plus nearest shelters.
- **One-tap actions** — "Call for help" (`tel:` link) and "Safe route" (opens Google Maps directions).

## 1. Run it locally in VS Code

```bash
# unzip the project, then inside the folder:
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). Resize the window / use dev tools' device toolbar to see both the mobile and desktop layouts.

## 2. Push to your own GitHub repository

```bash
git init
git add .
git commit -m "Initial commit: RakshaSetu multi-hazard alert app"
git branch -M main

# create a new empty repo on GitHub first (via github.com/new), then:
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

## 3. Deploy to Vercel

A `vercel.json` is already included (Vite framework preset + SPA rewrite).

**Option A — Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

**Option B — Vercel dashboard**
1. Go to vercel.com → **Add New Project**.
2. Import the GitHub repository you just pushed.
3. Framework preset auto-detects as **Vite** — leave build command as `npm run build`, output directory as `dist`.
4. Click **Deploy**.

## Project structure

```
src/
  components/     AuthScreen, TopBar, AppNav, Footer, AlertBanner, DangerMap,
                  HazardCard, RiverGaugeCard, ShelterList, ActionButtons
  context/        AuthContext (login/register/profile), ThemeContext (dark/light)
  data/           Mock hazard events, river gauges, shelters, emergency contacts
  hooks/          useFloodRisk — geolocation + combined multi-hazard risk
  styles/         Design tokens incl. dark mode (index.css) + layout/components (app.css)
  types/          Shared TypeScript types (hazard + auth)
  utils/          hazardMeta — icons/labels/colors per hazard type
  views/          HomeView, MapView, AlertsView, ProfileView
  App.tsx         Auth gate + top bar + nav + view switching
  main.tsx        React entry point
```

## Auth — important note

This project has **no backend**. Accounts (name/email/obfuscated password) are stored only in the visiting browser's `localStorage`, so:
- Accounts do **not** sync across devices or browsers.
- The password is obfuscated for the demo, **not securely hashed** — do not reuse a real password here, and do not treat this as production-ready auth.

To make this a real product, replace `src/context/AuthContext.tsx` with a real auth provider (Firebase Auth, Auth0, Supabase Auth, or your own backend API), and swap `src/data/mockData.ts` for a live hazard-data API (e.g. Nepal's DHM hydrological data, seismic feeds, or your own sensor network).

## Credits

Developed by **Sunil Nishad**
Contact: +91 6393509754
Instagram: [@im____thor](https://instagram.com/im____thor)
