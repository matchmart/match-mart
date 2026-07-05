# Match Mart — Full Website V1

Full-stack textile/garment business website with public site + admin panel.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind CSS v4
- Backend: Node.js + Express + TypeScript + MongoDB + Mongoose
- Auth: JWT + bcrypt
- Images: Cloudinary + Multer

## What is included
- Public website: Home, Products, Product Details, Categories, Branches, Login, Register, Profile
- Admin panel: Dashboard, Settings, Products, Categories, Branches
- Product/category/branch image upload
- Logo/favicon upload
- No checkout/payment in V1

## Setup

### 1) Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Seed admin in another terminal:
```bash
cd server
npm run seed:admin
```

### 2) Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Default admin seed
Set these in `server/.env` before seeding:
```env
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@matchmart.lk
ADMIN_PASSWORD=Admin12345
```

## Important security notes
- SVG uploads are blocked.
- Backend uses relative imports only.
- Cloudinary image deletion happens after DB success where possible.
- Product/branch image removal only deletes images that belong to that record.
