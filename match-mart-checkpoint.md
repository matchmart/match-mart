# Match Mart — Project Checkpoint
_Last updated: Phase 2D-2 complete_

---

## 1. Completed Phases

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Foundation: monorepo setup, auth system, admin settings/logo base | ✅ Done |
| Phase 2A | Backend models: Product, Category, Branch + slug utility | ✅ Done |
| Phase 2B | Backend controllers + routes for Products, Categories, Branches | ✅ Done |
| Phase 2C | Frontend types/services + AdminCategoriesPage + AdminBranchesPage | ✅ Done |
| Phase 2D-1 | AdminProductsPage (full CRUD, search, filter, image upload) | ✅ Done |
| Phase 2D-2 | Public pages: ProductsPage, ProductDetailsPage, CategoriesPage, BranchesPage | ✅ Done |
| Phase 2D-3 | AppRoutes.tsx, AdminSidebar.tsx, Navbar.tsx updates | 🔲 TODO (next) |
| Phase 3 | Homepage CMS + slideshow + background images | 🔲 TODO (future) |

---

## 2. Files Created / Updated So Far

### Root
- `match-mart/README.md`
- `match-mart/client/.env.example`
- `match-mart/server/.env.example`

### Backend (`server/src/`)
**Config**
- `config/db.ts`
- `config/cloudinary.ts`

**Models**
- `models/User.ts`
- `models/WebsiteSettings.ts`
- `models/Category.ts` (with unique slug generation)
- `models/Branch.ts` (with slug field)
- `models/Product.ts` (with unique slug generation)

**Middleware**
- `middleware/errorHandler.ts`
- `middleware/notFound.ts`
- `middleware/authMiddleware.ts` (`protect`, `isAdmin`)
- `middleware/uploadMiddleware.ts` (Multer memory storage — **SVG blocked**)

**Utils**
- `utils/generateToken.ts`
- `utils/asyncHandler.ts`
- `utils/generateSlug.ts` (`generateSlug`, `generateUniqueSlug`)
- `utils/parseArrayField.ts` (sizes/colors comma or JSON parsing)
- `utils/parseBooleanField.ts` (safe boolean parsing from FormData strings)
- `utils/seedAdmin.ts` (run once via `npm run seed:admin`, uses `tsx`)

**Services**
- `services/cloudinaryService.ts` (`uploadToCloudinary`, `deleteFromCloudinary`)

**Controllers**
- `controllers/authController.ts` (register, login, admin-login, getMe, changePassword)
- `controllers/settingsController.ts` (getSettings, updateSettings, uploadLogo, uploadFavicon)
- `controllers/categoryController.ts` (full CRUD + safe delete order)
- `controllers/productController.ts` (full CRUD + multi-image + safe image removal + safe delete order)
- `controllers/branchController.ts` (full CRUD + multi-image + safe image removal + safe delete order)

**Routes**
- `routes/authRoutes.ts`
- `routes/settingsRoutes.ts`
- `routes/categoryRoutes.ts`
- `routes/productRoutes.ts`
- `routes/branchRoutes.ts`

**Types**
- `types/express/index.d.ts` (extends `Request.user`)

**Core**
- `app.ts` (mounts: auth, settings, categories, products, branches)
- `server.ts`

### Frontend (`client/src/`)
**Config**
- `vite.config.ts` (Tailwind v4 via `@tailwindcss/vite` plugin + `@` alias)
- `tsconfig.json`, `tsconfig.app.json`
- `styles/index.css` (Tailwind v4 `@theme` — no `tailwind.config.js` needed)

**Types**
- `types/auth.ts`
- `types/settings.ts` (⚠️ needs manual fix — see below)
- `types/category.ts`
- `types/product.ts`
- `types/branch.ts`

**Services**
- `services/axiosInstance.ts` (attaches `match_mart_token` from localStorage)
- `services/authService.ts`
- `services/settingsService.ts`
- `services/categoryService.ts`
- `services/productService.ts` (`buildProductFormData` — safe `discountPrice` handling)
- `services/branchService.ts`

**Context**
- `context/AuthContext.tsx`

**Routes**
- `routes/AppRoutes.tsx` (⚠️ needs Phase 2D-3 update — new routes not yet added)
- `routes/ProtectedRoute.tsx`
- `routes/AdminProtectedRoute.tsx`

**Layout Components**
- `components/layout/Navbar.tsx` (⚠️ needs Phase 2D-3 update — Categories/Branches links)
- `components/layout/Footer.tsx`
- `components/layout/PublicLayout.tsx`
- `components/layout/AdminLayout.tsx`
- `components/layout/AdminSidebar.tsx` (⚠️ needs Phase 2D-3 update — Products/Categories/Branches links)
- `components/layout/AdminTopbar.tsx`

**Public Pages**
- `pages/public/HomePage.tsx`
- `pages/public/ProductsPage.tsx`
- `pages/public/ProductDetailsPage.tsx`
- `pages/public/CategoriesPage.tsx`
- `pages/public/BranchesPage.tsx`

**Auth Pages**
- `pages/auth/LoginPage.tsx`
- `pages/auth/RegisterPage.tsx`
- `pages/auth/ProfilePage.tsx`

**Admin Pages**
- `pages/admin/AdminLoginPage.tsx`
- `pages/admin/AdminDashboardPage.tsx`
- `pages/admin/AdminSettingsPage.tsx`
- `pages/admin/AdminCategoriesPage.tsx`
- `pages/admin/AdminBranchesPage.tsx`
- `pages/admin/AdminProductsPage.tsx`

---

## 3. Critical Fixes to Remember

1. **Tailwind v4 + Vite setup** — use `npm install tailwindcss @tailwindcss/vite`, add `tailwindcss()` plugin in `vite.config.ts`. No `tailwind.config.js` needed — theme customization goes in `src/styles/index.css` via `@theme { }`.

2. **`client/src/types/settings.ts` still needs a manual fix** (per your last message, you're fixing this yourself) — correct syntax:
   ```typescript
   export type UpdateSettingsPayload = Partial<
     Omit<
       WebsiteSettings,
       | "_id"
       | "logoUrl"
       | "logoPublicId"
       | "faviconUrl"
       | "faviconPublicId"
       | "createdAt"
       | "updatedAt"
     >
   >;
   ```

3. **Backend uses relative imports only** (no `@/` alias) — Render/Node build step doesn't resolve TS path aliases reliably after compilation. Frontend still uses `@/` alias (Vite bundler resolves it fine).

4. **SVG uploads are blocked** in `uploadMiddleware.ts` — allowed types: `image/jpeg`, `image/png`, `image/webp`, `image/x-icon`, `image/vnd.microsoft.icon`. SVG excluded for XSS/security reasons.

5. **Cloudinary delete order safety** — for update/delete operations: always save DB changes (or delete the DB doc) **first**, and only delete old/removed Cloudinary images **after** the DB operation succeeds. Prevents orphaned or lost images if DB operations fail mid-way. Applied in `categoryController.ts`, `productController.ts`, `branchController.ts`.

6. **Safe image removal** — when a client sends `removeImagePublicIds`, the backend only deletes publicIds that actually exist in that specific product/branch's current `images` array (intersection check). Prevents a malicious/buggy client from deleting arbitrary Cloudinary assets belonging to other records.

7. **`axios.isAxiosError` helper pattern** — used across all admin/public pages instead of `instanceof AxiosError`:
   ```typescript
   const getErrorMessage = (error: unknown, fallback: string): string => {
     if (axios.isAxiosError<{ message?: string }>(error)) {
       return error.response?.data?.message || error.message || fallback;
     }
     if (error instanceof Error) return error.message;
     return fallback;
   };
   ```

8. **`discountPrice` NaN fix** — form field uses `setValueAs: (value) => (value === "" ? undefined : Number(value))` instead of `valueAsNumber`. Service layer (`buildProductFormData`) only appends `discountPrice` to FormData if `typeof === "number" && !Number.isNaN(...)`. Display checks use `typeof product.discountPrice === "number"` instead of truthy checks (so a discount price of `0` isn't accidentally treated as "no discount").

9. **BranchesPage phone/WhatsApp links** — rendered as real `<a>` tags:
   - Phone: `<a href={`tel:${branch.phone}`}>`
   - WhatsApp: `<a href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">`

10. **Seed script uses `tsx`**, not `ts-node-dev` — one-shot scripts should exit cleanly (`ts-node-dev` is a watch-mode tool, wrong fit for seeding).

11. **`verbatimModuleSyntax: true`** in `tsconfig` — always use `import type { ... }` for type-only imports (interfaces, types), and regular `import` for runtime values (components, functions).

12. Route ordering matters — always define specific paths (`/admin/all`, `/admin/:id`) **before** dynamic public paths (`/:slug`) in Express routers, otherwise Express matches the wrong route.

---

## 4. Remaining TODO

### Immediate — Phase 2D-3 (not yet done)
- [ ] Update `client/src/routes/AppRoutes.tsx` — add routes:
  - `/products`, `/products/:slug`, `/categories`, `/branches`
  - `/admin/products`, `/admin/categories`, `/admin/branches`
- [ ] Update `client/src/components/layout/AdminSidebar.tsx` — add nav links: Products, Categories, Branches
- [ ] Update `client/src/components/layout/Navbar.tsx` — add public nav links: Categories, Branches/Shop Locator

### Next — Phase 3
- [ ] Homepage CMS (admin-editable homepage sections/content)
- [ ] Slideshow management (admin CRUD for homepage slider images)
- [ ] Background images management
- [ ] (Later phases per original spec: FAQs, Privacy Policy, Terms, Reviews, Notifications, Coupons, Users management)

### Manual/pending on your side
- [ ] You mentioned fixing `client/src/types/settings.ts` manually — double check it matches the corrected version in section 3.

---

## 5. Continuation Prompt for New Chat

Copy-paste this into a new Claude conversation to resume exactly where we left off:

```
I'm continuing a paid client project called Match Mart (full-stack textile/garment 
business website — public site + admin panel) with Claude. I have a checkpoint document 
from a previous session (match-mart-checkpoint.md) summarizing everything built so far.

Tech stack: React + Vite + TypeScript + Tailwind CSS v4 + React Router + Axios (frontend), 
Node.js + Express + TypeScript + MongoDB + Mongoose + JWT + bcrypt + Cloudinary + Multer 
(backend). Deploying to Vercel (frontend), Render (backend), MongoDB Atlas (DB).

Completed: Phase 1 (foundation, auth, admin settings/logo), Phase 2A (Product/Category/
Branch models), Phase 2B (backend CRUD controllers + routes for products/categories/
branches), Phase 2C (AdminCategoriesPage, AdminBranchesPage), Phase 2D-1 
(AdminProductsPage), Phase 2D-2 (public ProductsPage, ProductDetailsPage, CategoriesPage, 
BranchesPage).

I'm attaching/pasting my checkpoint file with full file list and critical fixes to 
remember (Tailwind v4 Vite setup, relative imports on backend only, SVG blocked from 
uploads, Cloudinary delete-order safety, safe image removal scoped to owning record, 
axios.isAxiosError error helper pattern, discountPrice NaN handling, etc).

Next step: Phase 2D-3 — update AppRoutes.tsx (add /products, /products/:slug, 
/categories, /branches, /admin/products, /admin/categories, /admin/branches), update 
AdminSidebar.tsx (add Products/Categories/Branches links), update Navbar.tsx (add 
Categories/Branches links). Then Phase 3: Homepage CMS + slideshow + background images.

Please continue from Phase 2D-3. Build step by step by phases, keep code clean/
scalable/production-ready, use TypeScript, split long responses into parts and tell 
me to say "continue". I'm a student, my English isn't perfect — please guide me one 
step at a time and feel free to use some casual Sinhala/English mix (singlish) in 
explanations, and call me "chanuu".
```

---

_This checkpoint reflects everything built through Phase 2D-2. Keep this file safe — paste its contents (or attach it) into your next session so Claude can pick up exactly where we stopped._
