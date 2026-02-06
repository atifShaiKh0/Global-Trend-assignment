# Global Trend — Task Management

Brief README with setup and run instructions for the backend and frontend.

## Prerequisites

- Node.js (v18+ recommended)
- npm (or pnpm/yarn)
- Docker (for MongoDB)

## MongoDB Setup with Docker

Start a MongoDB container using Docker:

```bash
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
```

## Backend (API)

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file at `backend/.env` with your MongoDB connection string:

```
DATABASE_URL="mongodb+srv://admin:password@localhost:27017/task-management?authSource=admin"
PORT=4000
```

4. Start the backend in development mode:

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

1. Start MongoDB container:

```bash
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
```

Or if using Docker Compose:

```bash
docker-compose up -d
```

2. Open two terminals (or use your preferred terminal multiplexer):

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
## Tests & linting

- Backend tests (if present):

```bash
cd backend
npm test
```

- Frontend lint/format:

```bash
cd frontend
npm run lint
npm run format
```

## Stopping MongoDB

To stop the MongoDB container:

```bash
docker stop mongodb
docker rm mongodb
```

Or with Docker Compose:

```bash
docker-compose down
```

## Notes

- Backend scripts available: `dev`, `start`, `db:migrate`, `db:push`, `db:seed`.
- Frontend scripts available: `dev`, `build`, `preview`.
- MongoDB runs on port `27017` by default.
- Ensure MongoDB is running before starting the backend.
