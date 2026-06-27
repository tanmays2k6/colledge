# MERN Stack Task Tracker

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-339933.svg?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-000000.svg?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?logo=mongodb)

A modern, responsive, and robust Task Tracker application built from the ground up using the MERN stack (MongoDB, Express, React, Node.js). 

This application provides a seamless, single-page experience for managing projects with advanced filtering, real-time sorting, metric dashboards, and beautiful CSS-module driven UI components.

---

## Features

*   **Dynamic Dashboard**: Real-time statistical metric cards (Total, Pending, In Progress, Completed, High Priority).
*   **Advanced Filtering & Sorting**: Combinable filters (Status, Priority, Due Date) and 6 different sorting algorithms implemented seamlessly on the frontend.
*   **Instant Search**: Client-side title search that updates the DOM instantly without server roundtrips.
*   **Full CRUD Functionality**: Create, Read, Update, and Delete tasks via a unified RESTful API.
*   **Smooth UX/UI**: Animated skeleton loaders, sliding toast notifications, custom SVG empty states, and glassmorphism modals.
*   **Responsive Design**: CSS Grid and Flexbox layouts optimized for mobile, tablet, and desktop environments.

---

## Screenshots

> *Replace the placeholder URLs below with links to actual screenshots of your application.*

| Dashboard View | Task Edit Modal |
| :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/600x350.png?text=Dashboard+Screenshot) | ![Edit Modal Placeholder](https://via.placeholder.com/600x350.png?text=Modal+Screenshot) |

---

## Folder Structure

The project utilizes a decoupled architecture, separating the client and server into distinct directories.

```text
Coll-edge/
│
├── backend/                  # Express.js REST API
│   ├── src/
│   │   ├── config/           # Database and env configs (db.js)
│   │   ├── controllers/      # Route logic (taskController.js)
│   │   ├── middlewares/      # Error handling (errorMiddleware.js)
│   │   ├── models/           # Mongoose schemas (Task.js)
│   │   ├── routes/           # Express routing (taskRoutes.js)
│   │   └── index.js          # Express app entry point
│   ├── .env                  # Backend environment variables
│   └── package.json
│
└── frontend/                 # React SPA (Vite)
    ├── src/
    │   ├── api/              # Axios service instances (taskService.js)
    │   ├── assets/           # Static media (empty.png)
    │   ├── components/       # Reusable UI (Modals, Cards, Skeletons)
    │   ├── hooks/            # Custom React hooks (useTasks.js)
    │   ├── pages/            # Routable views (Home, TaskList)
    │   ├── App.jsx           # React Router configuration
    │   ├── index.css         # Global styles & keyframe animations
    │   └── main.jsx          # React entry point
    ├── vercel.json           # Vercel SPA routing configuration
    ├── .env                  # Frontend environment variables
    └── package.json
```

---

## Environment Variables

To run this project locally, you will need to create `.env` files in both the `frontend` and `backend` directories.

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskTracker
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Development Servers**
   *Open two terminal windows/tabs.*
   
   **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open the App**
   Navigate to `http://localhost:5173` in your browser.

---

## API Documentation

The backend REST API is served on `/api/tasks`. All requests and responses communicate in `application/json`.

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Fetch all tasks | N/A |
| **GET** | `/api/tasks/:id` | Fetch a single task by ID | URL Param: `id` |
| **POST** | `/api/tasks` | Create a new task | `{ title*, description, status, priority, dueDate }` |
| **PUT** | `/api/tasks/:id` | Update an existing task | `{ title, description, status, priority, dueDate }` |
| **DELETE** | `/api/tasks/:id` | Delete a task | URL Param: `id` |

> *\* Denotes a required field.*

---

## Deployment Guide

### Deploying the Backend (Render)
1. Sign up for [Render.com](https://render.com).
2. Create a new **Web Service** and connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set Build Command: `npm install` and Start Command: `npm start`.
5. Add the backend Environment Variables (`MONGO_URI`, `NODE_ENV=production`).
6. Deploy and copy your new live URL (e.g., `https://my-backend.onrender.com`).

### Deploying the Frontend (Vercel)
1. Sign up for [Vercel](https://vercel.com).
2. Add a **New Project** and import your GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Vercel will automatically detect Vite. Set the Build Command to `npm run build`.
5. Add the Environment Variable: `VITE_API_URL` pointing to your new Render backend URL + `/api` (e.g., `https://my-backend.onrender.com/api`).
6. Deploy! The included `vercel.json` will automatically handle React Router rewrites.

*(Optional but Recommended)*: Go back to Render and set `FRONTEND_URL` to your new Vercel domain to lock down CORS.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
