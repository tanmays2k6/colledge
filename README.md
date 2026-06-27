# 📝 MERN Task Tracker - Premium Edition

A beautiful, production-ready Task Tracker built with the MERN stack (MongoDB, Express, React, Node.js). Designed with a premium Glassmorphism UI, this application allows users to elegantly manage their daily tasks with full CRUD functionality, dynamic sorting, filtering, and responsive design.

![Dashboard Preview](placeholder-screenshot.png)

## ✨ Features

- **Premium UI:** Glassmorphism design, dark mode, smooth micro-animations.
- **Full CRUD:** Create, Read, Update, and Delete tasks.
- **Advanced Filtering & Sorting:** Filter by status, priority, and due date. Sort dynamically without backend hits.
- **Dynamic Dashboard:** Real-time metrics for total, pending, in-progress, and completed tasks.
- **Production Ready:** Optimized React rendering (`React.memo`), strict API validation, and graceful error handling.
- **Responsive:** Fluid layout that transitions to a bottom-navbar on mobile devices.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, React Router DOM, Vanilla CSS Modules
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas (or local)
- **Deployment:** Vercel (Frontend), Render (Backend)

## 🛠️ Local Installation

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone https://github.com/tanmays2k6/colledge.git
cd colledge
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file based on `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-tracker
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file based on `.env.example`:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend application:
```bash
npm run dev
```

## 🌍 Environment Variables (Production)

When deploying to production, ensure these variables are set in your hosting provider's dashboard.

**Backend (Render):**
- `PORT`: (Render sets this automatically)
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `NODE_ENV`: `production`
- `FRONTEND_URL`: Your deployed Vercel domain (e.g., `https://my-app.vercel.app`)

**Frontend (Vercel):**
- `VITE_API_URL`: Your deployed Render backend URL appended with `/api` (e.g., `https://my-api.onrender.com/api`)

## 🌐 Deployment Instructions

### One-Click Deploy Frontend (Vercel)
1. Push this repository to your GitHub account.
2. Log into [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import this GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `frontend`.
6. Add the Environment Variable `VITE_API_URL` pointing to your deployed backend.
7. Click **Deploy**.

### One-Click Deploy Backend (Render)
1. Log into [Render](https://render.com/) and click **New > Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npm start`.
6. Add all required Environment Variables (see above).
7. Click **Create Web Service**.

## 📡 API Endpoints

The backend exposes a standard REST API at `/api/tasks`.

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Server Health Check | None |
| `GET` | `/api/tasks` | Fetch all tasks | None |
| `POST` | `/api/tasks` | Create a new task | `{ title, description, priority, status, dueDate }` |
| `PUT` | `/api/tasks/:id` | Update an existing task | `{ title, description, priority, status, dueDate }` |
| `DELETE` | `/api/tasks/:id` | Delete a task | None |

## 📄 License
MIT License
