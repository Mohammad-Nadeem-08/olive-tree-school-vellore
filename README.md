# Olive Tree Nursery & Primary School — Web Portal
**Kaspa, Vellore, Tamil Nadu** (In association with Brainy Stars International School)

Modern, accessible, trilingual web portal (English, Tamil, Urdu) built with React 19, TypeScript, Vite, and Tailwind CSS v4, deployed on Vercel.

---

## ⚙️ Centralized School Configuration System

The website features an authoritative, single-source-of-truth configuration architecture. Important school parameters are managed through the **Quick School Settings** modal within the Staff Admin Command Dock:

1. **Admission Year Pill:** (e.g. `2027-2028`, `2028-2029`)
2. **Years of Excellence Badge:** (e.g. `13+`, `14+`)
3. **Primary Phone (WhatsApp Admissions Desk):** (e.g. `86101 13160`)
4. **Phone 2 (Office Line):** (e.g. `96290 49907`)
5. **Phone 3 (Alternative Line):** (e.g. `89037 99660`)

When an authorized administrator saves these settings, they persist centrally and propagate across every user-facing section of the portal automatically without editing individual components.

---

## 🏛️ Persistent Shared Storage Architecture

The settings persistence mechanism follows a resilient multi-tier design:

1. **Vercel Serverless API (`/api/config`):**
   - **`GET /api/config` (Public Read):** Serves current configuration with edge cache headers (`Cache-Control: public, s-maxage=15, stale-while-revalidate=60`).
   - **`POST /api/config` (Admin Write):** Authenticates via Bearer/Basic token (`olive2026`), validates payload schema server-side, updates persistent storage, and returns sanitized configuration.
2. **Persistent Storage Layer (Zero Paid Services):**
   - Supports **Upstash Redis** or **Vercel KV REST API** via zero-dependency HTTP requests when environment variables are set.
   - Gracefully falls back to serverless warm cache, `/tmp/ots_school_config.json`, and local verified defaults (`DEFAULT_CONFIG`).
3. **Client-Side Sync & Cache:**
   - On initial mount, client fetches latest configuration in the background and caches it in `localStorage` (`ots_site_config`).
   - Automatically synchronizes via `focus` and `visibilitychange` events and periodic 3-minute background polling.
4. **Trilingual Schema Interpolation:**
   - Dynamic interpolation (`getInterpolatedTranslations`) automatically formats English, Tamil, and Urdu translations with the active academic year and primary phone without altering grammar or sentence structure.

---

## 🔑 Environment Variables & Cloud KV Setup

To enable global multi-device shared persistence on Vercel without paid add-ons:

| Variable | Description |
| :--- | :--- |
| `KV_REST_API_URL` | Vercel KV or Upstash Redis REST endpoint URL |
| `KV_REST_API_TOKEN` | Vercel KV or Upstash Redis Bearer access token |
| `UPSTASH_REDIS_REST_URL` | Alternative Upstash REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Alternative Upstash REST token |

### Connecting Free Storage on Vercel (1-Click):
1. In the Vercel Dashboard for `olive-tree-school-vellore`, navigate to the **Storage** tab.
2. Click **Create Database** -> Select **KV** or **Upstash Redis** (Free Hobby Tier).
3. Connect the store to your project. Vercel will automatically populate `KV_REST_API_URL` and `KV_REST_API_TOKEN`.

---

## 🔐 Admin Authentication

- **Portal Trigger:** Staff icon in the top utility bar or floating bottom dock.
- **Username:** `admin`
- **Password:** `olive2026`

---

## 🛠️ Local Development & Scripts

```bash
# Start local development server (with built-in /api/config mock middleware)
npm run dev

# Run lint checks
npm run lint

# TypeScript verification
npx tsc -b

# Production bundle build
npm run build

# Run automated centralized settings test suite
node scratch/test-centralized-settings.js
```
