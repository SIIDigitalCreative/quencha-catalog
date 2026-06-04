# Quencha Catalog — Next.js + Upstash Redis + Vercel

## Stack
- **Next.js 15** (App Router) — framework
- **Upstash Redis** — product data + settings storage
- **Vercel Blob** — image uploads
- **Vercel** — hosting

---

## Setup in 5 Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial Quencha Catalog"
git remote add origin https://github.com/YOUR_USERNAME/quencha-catalog.git
git push -u origin main
```

### 2. Create Upstash Redis Database
1. Go to **console.upstash.com** → Create Database
2. Choose **Regional** → select nearest region
3. Copy **UPSTASH_REDIS_REST_URL** and **UPSTASH_REDIS_REST_TOKEN**

### 3. Create Vercel Blob Store
1. Go to **vercel.com** → your project → **Storage** tab
2. Create a **Blob** store named `quencha-images`
3. Copy **BLOB_READ_WRITE_TOKEN**

### 4. Deploy on Vercel
1. **vercel.com** → New Project → Import your GitHub repo
2. Add these Environment Variables:
   ```
   UPSTASH_REDIS_REST_URL     = (from step 2)
   UPSTASH_REDIS_REST_TOKEN   = (from step 2)
   BLOB_READ_WRITE_TOKEN      = (from step 3)
   ```
3. Click **Deploy**

### 5. Done!
On first load the app auto-seeds all 19 products into Redis.
Visit your Vercel URL and everything is live.

---

## Local Development
```bash
cp .env.local.example .env.local
# Fill in your keys
npm install
npm run dev
```

---

## Edit Mode
Click the **pencil icon** in the top-right of the navbar.  
Password: **quencha2026**

---

## API Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| POST | `/api/products` | Create product |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |
| GET | `/api/settings` | Get banners + site settings |
| PUT | `/api/settings` | Update banners + site settings |
| POST | `/api/upload` | Upload image → Vercel Blob URL |

---

## Project Structure
```
quencha-catalog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       ├── products/route.ts
│       ├── products/[id]/route.ts
│       ├── settings/route.ts
│       ├── upload/route.ts
│       └── seed/route.ts
├── components/
│   └── QuenchaCatalog.jsx    ← main catalog component
├── lib/
│   └── redis.ts
├── .env.local.example
└── README.md
```
