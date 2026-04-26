# Brand Positioning Audit

AI-powered brand audit tool built on the B.R.A.N.D. and B.E.S.P.O.K.E. frameworks.

---

## Deploy on Replit (5 minutes)

### Step 1 — Create a new Replit
1. Go to replit.com and sign in
2. Click **"+ Create Repl"**
3. Choose **"Node.js"** as the template
4. Name it `brand-audit`
5. Click **"Create Repl"**

### Step 2 — Upload the files
Upload these 3 files to your Repl:
- `server.js` → root folder
- `package.json` → root folder
- `public/index.html` → create a `public` folder first, then upload inside it

### Step 3 — Add your API key (secret)
1. In Replit, click the **"Secrets"** tab (lock icon on the left sidebar)
2. Click **"New Secret"**
3. Key: `ANTHROPIC_API_KEY`
4. Value: your Anthropic API key (get it at console.anthropic.com)
5. Click **"Add Secret"**

### Step 4 — Run
1. Click the **"Run"** button
2. Your app will be live at the URL shown in the top of the preview panel
3. Share that URL with anyone — it works immediately

---

## Project structure

```
brand-audit/
├── server.js          ← backend (keeps API key secure)
├── package.json       ← dependencies
└── public/
    └── index.html     ← the full frontend
```

---

## How it works

1. User fills the 11-question audit form
2. Frontend sends answers to `/api/generate` on your server
3. Server calls Anthropic API with the B.R.A.N.D. framework prompt
4. Report is generated and displayed instantly

The API key never touches the frontend — it lives securely in the server environment.

---

## Customization

- **Change the prompt**: edit the `buildPrompt()` function in `server.js`
- **Change the design**: edit `public/index.html`
- **Change the model**: find `claude-sonnet-4-20250514` in `server.js` and swap it
