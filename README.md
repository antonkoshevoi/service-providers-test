# Service Providers Management System

This project consists of a **frontend (React + Vite)** and a **backend (Fastify + Knex + Objection.js with PostgreSQL 16)**.

## 🚀 Tech Stack
### Backend:
- **Node.js 20**
- **Fastify**
- **Objection.js** (ORM)
- **Knex.js** (SQL query builder)
- **PostgreSQL 16**

### Frontend:
- **React 18 (Vite)**
- **MUI (Material UI)**
- **Redux Toolkit** (state management)
- **Axios** (for API requests)
- **Day.js** (date handling)

---

## 🔧 Setup Instructions

### 1⃣ Prerequisites
Before you begin, make sure you have the following installed:
- **[Node.js 20](https://nodejs.org/en/)**
- **[PostgreSQL 16](https://www.postgresql.org/download/)**

---

## 📌 Backend Setup
### 1⃣ Navigate to the backend folder
```sh
cd backend
```

### 2⃣ Install dependencies
```sh
npm install
```

### 3⃣ Create a `.env` file
Create a `.env` file in the `backend/` folder and add the following content:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=service-providers
```
Modify the values as per your PostgreSQL configuration.

### 4⃣ Create the PostgreSQL database
Open your PostgreSQL client and run:
```sql
CREATE DATABASE service_providers;
```
Or just simply use PgAdmin to create it


Ensure the database name matches the one in `.env`.

### 5⃣ Run database migrations
```sh
npm run migrate:latest
```

### 6⃣ Start the backend server
```sh
npm run dev
```
The backend should now be running at `http://localhost:5000` (or another port if configured).

---

## 🎨 Frontend Setup
### 1⃣ Navigate to the frontend folder
```sh
cd ../frontend
```

### 2⃣ Install dependencies
```sh
npm install
```

### 3⃣ Start the development server
```sh
npm run dev
```
The frontend should now be running at `http://localhost:5173` (or another available port).

---

## 📦 Build and Run
### To build the backend:
```sh
npm run build
```
Then start it using:
```sh
npm start
```

---

## 🛠 Additional Commands
- **Rollback last migration:** `npm run migrate:rollback`
- **Create a new migration:** `npm run migrate:make migration_name`

---

## 📌 Notes
- Ensure PostgreSQL is running before starting the backend.
- If you encounter issues, verify your `.env` configuration.
- The backend and frontend communicate via API, so both should be running.
