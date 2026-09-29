# TA Tool — Frontend Starter (React + Vite + Ant Design + Entra ID SSO)

This is the initial scaffold for Screen 1 (SSO Entry / Login) from the wireframe brief.
Everything below is meant to be run on your own machine in VS Code.

---

## 0. Prerequisites

- Node.js **18+** installed (`node -v` to check)
- VS Code with extensions: **ESLint**, **Prettier**, **ES7+ React/Redux/React-Native snippets**
- Access to your organization's **Microsoft Entra ID** tenant (you'll need a Client ID / Application ID and Tenant ID — ask whoever manages Entra ID, or follow Step A below if that's you)

---

## 1. Create the project

```bash
npm create vite@latest ta-tool-frontend -- --template react
cd ta-tool-frontend
npm install
```

This gives you a working Vite + React app. Now add the two library sets you need:

```bash
# UI library
npm install antd @ant-design/icons

# Routing
npm install react-router-dom

# Microsoft Entra ID authentication
npm install @azure/msal-browser @azure/msal-react
```

Run the dev server any time with:
```bash
npm run dev
```

---

## 2. Copy in these starter files

Replace/add the files from this package into your new project at the matching paths:

```
src/
├── main.jsx          ← replaces Vite's default
├── App.jsx            ← replaces Vite's default
├── authConfig.js       ← new
└── pages/
    └── LoginPage.jsx   ← new
```

(Delete Vite's default `App.css` / boilerplate content — Ant Design handles styling, you don't need it.)

---

## 3. Register the app in Microsoft Entra ID (Step A — do this once, as admin)

Before the "Sign in with Microsoft" button will work, the app itself needs to be registered as an application in your tenant:

1. Go to [entra.microsoft.com](https://entra.microsoft.com/) → **Identity** → **Applications** → **App registrations** → **New registration**.
2. Name it (e.g. "TA Tool - Frontend").
3. Supported account types: usually **"Accounts in this organizational directory only"** (single tenant) for an internal tool.
4. Redirect URI: choose platform **Single-page application (SPA)**, and enter `http://localhost:5173` for local dev (Vite's default port). You'll add your real deployed URL here later too.
5. Click **Register**.
6. From the app's **Overview** page, copy:
   - **Application (client) ID**
   - **Directory (tenant) ID**
7. Go to **Authentication** on the left → confirm the SPA redirect URI is listed → under "Implicit grant and hybrid flows" you generally **don't** need to check anything (MSAL React uses the modern auth code + PKCE flow, not implicit).

Put these two values into `src/authConfig.js` (see comments in that file).

---

## 4. Custom branding on the Entra sign-in screen (optional, cosmetic)

This is the part from your notes — it styles Microsoft's *own* login page (the screen the user sees after clicking your button and being redirected), not your app's page.

1. [entra.microsoft.com](https://entra.microsoft.com/) → **Company Branding** (this has replaced/sits alongside what used to be called "Custom Branding") → **Default sign-in experience** → **Edit**.
2. **Layout tab:** choose full-screen or partial/split-screen background.
3. **Basics tab:** upload background image (1920×1080px, ≤300KB) and favicon (32×32px, ≤5KB).
4. **Sign-in form tab:** upload banner logo (245×36px, ≤50KB), add any sign-in page text/disclaimer.
5. **Review + create** → **Save**.
6. Test in an incognito window: `https://login.microsoftonline.com/<yourdomain.com>`

This only affects the Microsoft-hosted screen. Your own Login Page (Step 2 above) is the screen the user sees *before* that, with your own branding, and is what you control fully.

---

## 5. Run it

```bash
npm run dev
```
Open `http://localhost:5173` — you should see the split-screen Login Page with a "Sign in with Microsoft" button. Clicking it redirects to Entra ID; after successful login, MSAL redirects back and `App.jsx` routes the user onward (currently to a placeholder landing route — this is where Screen 2, Customer/Requisition Landing, will go next).

---

## 6. What's next (in build order, per the wireframe brief)

1. ✅ SSO Entry / Login (this scaffold)
2. Global components: app shell/nav, loading/error state pattern, confirmation modal
3. Customer/Requisition Landing + New/Edit Requisition
4. Criteria Review
5. Requisition Workspace (most complex — budget the most time)
6. CV Upload Panel + Candidate Detail
7. Sourcing Database, Manager Assignment, Notification Center
8. Super-admin Configuration

Say the word when you're ready for the app shell + routing structure or the Customer/Requisition Landing screen next.
