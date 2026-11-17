# 🌱 EcoRoute — Eco-Friendly Route Planner

A web-based prototype that helps users compare travel options — **Car, Bus,
Train, and Bicycle** — based on distance, estimated fuel consumption, and
estimated CO₂ emissions, and highlights the more environmentally friendly
choice for a given journey.

Built as a university Environmental Studies project.

---

## 🔍 What it does

1. Visitors land on a marketing homepage and can **Sign Up** or **Log In**
   (UI-only — no real backend/authentication; both forms redirect straight
   to the dashboard once filled in validly).
2. Inside the **Dashboard**, the user enters a starting location and
   destination and clicks **Compare Routes**.
3. For each transport mode (Car, Bus, Train, Bicycle) the app estimates:
   - Distance
   - Fuel consumption (where applicable)
   - CO₂ emissions
4. Results appear as comparison cards, a summary/bar-chart dashboard, and a
   highlighted **eco-friendly recommendation** (lowest-emission option).
5. The dashboard also has placeholder **Trip History** and **Impact Report**
   panels for tracking comparisons over time.

## 🗺️ Pages

| Page | Purpose |
|---|---|
| `index.html` | Marketing/landing page — hero, how it works, environmental impact, about |
| `login.html` | Log in (UI-only, redirects to dashboard) |
| `signup.html` | Create account (UI-only, redirects to dashboard) |
| `dashboard.html` | The core app — Overview, Plan a Route, Trip History, Impact Report |

---

## 🛠️ Tech stack

- **HTML5** — semantic page structure
- **CSS3** — styling, layout, responsiveness (no frameworks)
- **Vanilla JavaScript** — form handling, calculations, dynamic UI updates
- No build tools or external frameworks required — runs directly in the
  browser.

---

## 📁 Project structure

```
Eco-Friendly-Route-Planner/
│
├── index.html          ← landing page (Member 1)
├── login.html          ← log in page, UI-only (Member 1)
├── signup.html         ← sign up page, UI-only (Member 1)
├── dashboard.html       ← main app: route planner + results (Member 1)
│
├── style.css            ← styling & responsive design, all pages (Member 1)
├── nav.js               ← landing page nav behavior (Member 1)
├── auth.js              ← login/signup validation + redirect, UI-only (Member 1)
├── script.js            ← dashboard: calculations & dynamic behavior (Member 2)
│
├── assets/
│   ├── images/          ← favicon.svg, logo.svg, hero-illustration.svg
│   └── icons/           ← car, bus, train, bicycle + UI icons (SVG)
│
├── docs/
│   ├── 01-project-overview.md
│   ├── 02-js-integration-guide.md   ← read this first, Member 2
│   ├── 03-data-sources.md           ← TEMPLATE, Member 3 fills in
│   ├── 04-ui-design-notes.md
│   ├── 05-test-cases.md
│   └── 06-screenshots-guide.md
├── screenshots/         ← 10 preview screenshots (retake finals yourselves)
└── README.md            ← this file
```

---

## ▶️ How to run it locally

No installation or build step needed.

**Option A — just open it:**
Double-click `index.html`, or right-click → **Open with** your browser.
Navigate to Sign Up / Log In from there to reach the dashboard.

**Option B — with a local server (recommended):**
A local server avoids any browser restrictions on loading local files and is
closer to how the site would behave once deployed.

- **VS Code:** install the *Live Server* extension → right-click
  `index.html` → **Open with Live Server**.
- **Python:** `python -m http.server 5500` from the project folder, then
  visit `http://localhost:5500`.

To jump straight to the dashboard while testing, open `dashboard.html`
directly, or use the "Continue as guest" link on the login page.

---

## 🧮 Data & calculations

Fuel-consumption and CO₂-emission figures are estimates based on
[assumptions to be documented in `docs/`]. See `docs/03-data-sources.md`
(Member 3) for the values and references used.

`script.js` currently ships with placeholder numbers in
`PLACEHOLDER_RESULTS` so the UI is demoable before real calculations are
wired in — replace that object's logic with the real calculation method,
keeping the same data shape so the display code doesn't need to change.

---

## 👥 Team & responsibilities

| Member | Responsibility |
|---|---|
| **Member 1** | Frontend/UI — `index.html`, `style.css`, responsive design |
| **Member 2** | Functionality — `script.js`, calculations, dynamic results |
| **Member 3** | Data, testing, GitHub — assumptions, test cases, bug reports, repo management, screenshots |

---

## ✅ Status

- [x] UI structure and styling complete (landing, login, signup, dashboard)
- [x] Interface behaviour tested (validation, redirects, panel switching)
- [ ] Distance/fuel/CO₂ calculations connected (Member 2)
- [ ] Data sources documented in `docs/03-data-sources.md` (Member 3)
- [ ] Calculation test cases run and recorded (Member 3)
- [ ] Final screenshots + GitHub evidence captured (Member 3)

---

## 📄 License / disclaimer

Educational prototype developed for an Environmental Studies university
project. Not intended for commercial use or real-world route guidance.
