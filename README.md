# ThermTech HVAC — Website

A fast, modern, single-page marketing site for ThermTech, a Toronto family-owned HVAC
company. Built as plain HTML, CSS and JavaScript with **no build step** — it drops
straight onto GitHub Pages (or any static host).

The design leans into HVAC's core idea — the balance of **heat and cool** — using a
frost→ember "thermal" accent and an interactive thermostat-dial hero, kept disciplined
against a trustworthy navy + white base.

---

## What's in here

```
thermtech/
├── index.html          # the whole site (one page, anchor navigation)
├── 404.html            # friendly not-found page
├── css/style.css       # all styles + design tokens (top of file)
├── js/script.js        # mobile nav, scroll reveals, stat counters, dial toggle, form
├── assets/
│   ├── logo.svg         # full logo (dark text — for light backgrounds)
│   ├── logo-light.svg   # full logo (light text — for the dark footer)
│   └── favicon.svg      # icon-only mark (browser tab / app icon)
├── robots.txt
└── .nojekyll           # tells GitHub Pages to serve files as-is
```

## Preview it locally

Just open `index.html` in a browser. For a closer-to-production preview with a local
server (so paths behave exactly like they will live):

```bash
# from inside the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Deploy on GitHub Pages

### Option A — drag & drop (no command line)

1. Create a new repository on GitHub, e.g. `thermtech-website`.
2. On the repo page click **Add file → Upload files**, then drag in **everything inside
   this folder** (not the folder itself — the files should sit at the repo root).
3. Commit.
4. Go to **Settings → Pages**. Under *Build and deployment*, set **Source = Deploy from a
   branch**, **Branch = `main`**, folder **`/ (root)`**. Save.
5. Wait ~1 minute. Your site is live at `https://<your-username>.github.io/thermtech-website/`.

### Option B — git command line

```bash
cd thermtech
git init
git add .
git commit -m "Initial ThermTech site"
git branch -M main
git remote add origin https://github.com/<your-username>/thermtech-website.git
git push -u origin main
```

Then enable Pages under **Settings → Pages** as in step 4 above.

---

## Use the real domain (thermtechhvac.com)

1. In **Settings → Pages → Custom domain**, enter `www.thermtechhvac.com` and save.
   (GitHub creates a `CNAME` file in the repo for you.)
2. At your domain registrar, add DNS records:
   - A `CNAME` record: `www` → `<your-username>.github.io`
   - For the bare domain `thermtechhvac.com`, add four `A` records pointing to GitHub:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Back in GitHub Pages, tick **Enforce HTTPS** once the certificate is issued.

---

## Make the quote form actually send

The form works out of the box in a **fallback mode**: if it isn't connected to a backend,
clicking submit opens the visitor's email app with the details pre-filled to
`info@thermtechhvac.com`. To receive submissions directly instead, connect a free form
service like **Formspree**:

1. Create a form at [formspree.io](https://formspree.io) and copy your form ID
   (looks like `xmyzabcd`).
2. In `index.html`, find the `<form id="quoteForm" ...>` tag and replace
   `https://formspree.io/f/your-form-id` with your real endpoint
   (`https://formspree.io/f/xmyzabcd`).

That's it — submissions will now land in your email. (The script automatically switches
out of the mailto fallback once a real endpoint is set.)

---

## Customizing

**Colors, fonts, spacing** live as CSS variables at the very top of `css/style.css` under
`:root` — change them in one place and the whole site follows. The thermal accent is the
`--thermal` gradient (frost → ember).

**Text / services / phone / email** are all directly in `index.html` as plain content —
search for `416-835-1289` or `info@thermtechhvac.com` to update contact details, and edit
the `<article class="svc ...">` cards to change services.

**The logo** is vector SVG, so it stays crisp at any size. Edit the three files in
`assets/` if you want to tweak it, or swap them for your own. The mark is a thermostat
"dial" split into a cooling (blue) half and a heating (orange) half — simple, scalable,
and instantly readable as heating + cooling.

**Adding real photos (optional).** The site looks finished without them — service
cards and the "Why Us" panel use designed gradients by default. To use real
photography, drop JPGs into `assets/img/` using the filenames listed in
`assets/img/README.txt`; they appear automatically and fall back to the gradient if a
file is missing. (Until you add them, the browser console will log a few harmless
"file not found" notes for the optional images — visitors never see these.)

**Adding more pages:** copy `index.html` to e.g. `about.html`, keep the header/footer, and
swap the main content. Update the nav links from `#about` anchors to `about.html`.

---

## Accessibility & performance notes

- Responsive from large desktop down to small phones.
- Keyboard-focusable controls and visible focus states.
- Respects `prefers-reduced-motion` (animations switch off).
- No frameworks, no trackers, no build — loads fast and is easy to maintain.
