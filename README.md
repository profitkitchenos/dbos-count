# D'bo's Daily AM Food Count — dbos.myprofitkitchen.com

Branded, installable count app for D'bo's Daiquiris, Wings & Seafood (Jacksonville).
Powered by Profit Kitchen. The page lives here on GitHub Pages; the data lives in the
"D'bo's Daily Ops" Google Sheet via the Apps Script (v34 or later).

## What's in this folder
| File | What it does |
|---|---|
| `index.html` | The count app (search, filters, +/− counting, pars, submit) |
| `manifest.webmanifest` | Lets phones "install" it with its own icon, full screen |
| `sw.js` | Keeps the app on the phone so it opens fast and opens with no signal |
| `icons/` | App icons |
| `CNAME` | Tells GitHub Pages to answer at `dbos.myprofitkitchen.com` |

No passwords or keys are stored here. The only link inside `index.html` is the
Apps Script address, which is the same link already printed on the QR card.

## One-time setup

### 1. Update the Apps Script to v34
1. Open the D'bo's Daily Ops Sheet → Extensions → Apps Script.
2. Select all, delete, paste in `Dbos_Apps_Script_v34.gs`, save.
3. Deploy → **Manage deployments** → pick the deployment whose link works
   (ends in `...OSIKLQ/exec`) → pencil icon → Version: **New version** → Deploy.
   **Do not create a new deployment** — that would change the link.

### 2. Create the GitHub repo
1. github.com → **+** → **New repository**.
2. Name: `dbos-count`. Visibility: **Public** (free GitHub Pages needs public). Create.
3. Click **uploading an existing file**, drag in everything from this folder
   (including the `icons` folder and the `CNAME` file), then **Commit changes**.

### 3. Turn on GitHub Pages
1. Repo → **Settings** → **Pages**.
2. Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
3. Custom domain should already show `dbos.myprofitkitchen.com` (from the CNAME
   file). If not, type it in and Save.

### 4. Point the address at GitHub (at whoever manages DNS for myprofitkitchen.com)
Add one record:

| Type | Host / Name | Value / Points to | TTL |
|---|---|---|---|
| CNAME | `dbos` | `YOUR-GITHUB-USERNAME.github.io` | default |

- Use your actual GitHub username (all lowercase), ending in `.github.io`.
- If the DNS is on Cloudflare, set the record to **DNS only** (grey cloud).

### 5. Finish and test
1. Back in GitHub → Settings → Pages: wait for the green DNS check (minutes,
   occasionally a few hours), then tick **Enforce HTTPS**.
2. On a phone, open `https://dbos.myprofitkitchen.com`, count 1–2 items, Submit,
   and confirm the Food Count email arrives.
3. Install it: iPhone Safari → Share → **Add to Home Screen**; Android Chrome →
   **Install app** (or ⋮ → Add to Home screen).

## Updating later
- **Pars:** change them in the Food Par Levels tab. Nothing to redeploy.
- **Items:** change `FOOD_COUNT_SECTIONS` in the script, run "Update Food Count Form
  (Keeps Responses)", then redeploy a **New version** of the same deployment. This
  page picks up the new list automatically.
- **Page design:** edit `index.html` here. If you change files the phone keeps
  offline, bump `CACHE = "dbos-count-v1"` in `sw.js` to `v2` so phones refresh.

## Backups
- Google-hosted app (same data, Google banner): the `/exec` link inside `index.html`.
- Plain Google Form: https://docs.google.com/forms/d/e/1FAIpQLSejLJTsEuykLKr9WsD6OJ7XbQBOtyLE3vqrKIfOrVtgHwnypA/viewform
