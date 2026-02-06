# Global Trend — Task Management

Brief README with setup and run instructions for the backend and frontend.

## Prerequisites

- Node.js (v18+ recommended)
- npm (or pnpm/yarn)

## Backend (API)

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file at `backend/.env` with at least the following variables:

```

## I have used mongodb in docker not locally so first start a mongodb container in docker then run node index.js in backend/src folder

DATABASE_URL="file:./dev.db" 
PORT=4000
```

Adjust `DATABASE_URL` to your database (Postgres, MySQL, etc.) if you are not using SQLite.

4. Run Prisma migrations and seed (if needed):

```bash
npm run db:migrate
npm run db:seed
```

5. Start the backend in development mode:

```bash
npm run dev
```

## Frontend (UI)

1. Open a terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

This will start Vite and open the frontend on the port Vite reports (usually 5173).

## Running both locally

Open two terminals (or use your preferred terminal multiplexer):

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```


```bash
cd frontend
npm run lint
npm run format
```

## Notes

- Backend scripts available: `dev`, `start`, `db:migrate`, `db:push`, `db:seed`.
- Frontend scripts available: `dev`, `build`, `preview`.
- If you need help creating a `.env` file or configuring a production database, tell me which DB you want and I can provide an example `DATABASE_URL`.
