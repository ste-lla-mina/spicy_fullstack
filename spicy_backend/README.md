# Spicy Backend v2

Clean Express + MongoDB API built from scratch for the Spicy restaurant platform.

## Quick start

```bash
cd spicy_backend
cp .env.example .env   # set MONGODB_URI and JWT_SECRET
npm install
npm run dev
```

Frontend (separate terminal):

```bash
cd spicy_frontend
npm run dev
```

## Demo account (auto-seeded on first run)

| Role | Email | Password |
|------|-------|----------|
| Owner | owner@spicy.com | password123 |

## API overview

### Auth — `/api/auth`
- `POST /signup` — client registration
- `POST /signup-owner` — owner + restaurant + tables
- `POST /verify` — 6-digit email verification
- `POST /login` — JWT login
- `POST /forgot-password`, `/verify-reset-code`, `/reset-password`
- `GET /me` — current user (Bearer token)

### Menu — `/api/menu` (auth required)
- `GET /items` — list (query: `category`, `sort`, `status`, `view=client|orders`)
- `GET /top-rated`, `GET /specials`
- `POST /items` — create (owner)
- `PATCH /items/:id` — update (owner)
- `PATCH /items/:id/toggle` — Active/Inactive toggle (owner)
- `DELETE /items/:id` — delete (owner)

### Orders — `/api/orders` (auth required)
- `GET /` — list orders
- `GET /stats` — revenue/payment aggregates (owner)
- `GET /active-clients` — live diner profiles (owner)
- `POST /` — place order (client cart or owner manual)
- `PATCH /:id/status`, `PATCH /:id/pay`, `PATCH /:id`, `DELETE /:id`

### Tables — `/api/tables` (auth required)
- `GET /` — owner occupancy view
- `PATCH /:tableNo/toggle` — mark occupied/free
- `GET /available` — client booking search
- `POST /reservations`, `GET /reservations`

### Overview — `/api/overview` (owner)
- `GET /` — KPIs, sales breakdown, top clients & menu items

### Settings — `/api/settings` (owner)
- `GET /restaurant`, `PUT /restaurant`

### Users — `/api/users` (auth required)
- `PATCH /profile`, `/password`, `/notifications`
