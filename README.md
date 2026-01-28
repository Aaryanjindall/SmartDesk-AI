# 🚀 SmartDesk AI

SmartDesk AI is a **full-stack AI-powered SaaS application** that provides multiple intelligent tools for content creation, image generation, and document processing.  
The project is designed with **real-world production practices**, including authentication, usage limits, cloud storage, and full Docker support.

---

## 🧠 Project Overview

SmartDesk AI is built to help users:

- Generate AI-based content (articles, titles, resumes)
- Create and edit images using AI
- Manage free vs premium usage
- Securely authenticate users
- Scale easily using Docker

This project follows a **modern full-stack architecture** and can be run locally or deployed to cloud platforms.

---

## ✨ Key Features

### 🔐 Authentication & User Management
- Clerk authentication
- Secure JWT-based API access
- Free & Premium plan handling

### 📝 AI Content Tools
- Article generation
- Blog title generation
- Resume review with AI

### 🎨 AI Image Tools
- Text → Image generation
- Background removal
- Object removal from images
- Cloudinary-based image storage

### ⚙️ Platform Features
- Free usage limits for non-premium users
- Premium-only AI features
- Database storage for generated content
- Clean & modern UI

### 🐳 DevOps Ready
- Fully Dockerized (Client + Server)
- Docker Compose for one-command setup
- Production frontend served with Nginx

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Clerk Authentication
- Axios

### Backend
- Node.js
- Express.js
- Clerk (Auth & Subscriptions)
- PostgreSQL (SQL)
- Cloudinary
- Gemini / ClipDrop APIs

### DevOps
- Docker
- Docker Compose
- Nginx
- GitHub Actions (CI/CD ready)

---

## 🌍 Live Deployed Version

👉 **Frontend (Vercel)**  
🔗 https://smart-desk-ai-eight.vercel.app

👉 **Backend (Render)**  
🔗 https://smartdesk-ai-dtfo.onrender.com

---

## ▶️ Run This Project Locally Using Docker

You can run the **entire project (frontend + backend)** with **one command** using Docker.

---

### 🔥 Prerequisites

Make sure you have installed:

- Docker Desktop  
- Docker Compose  

---

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/SmartDesk-AI.git
cd SmartDesk-AI


⚙️ Setup Environment Variables

Create .env files (these are required).

🔹 Client (client/.env)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000


🔹 Server (server/.env)
PORT=3000

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

DATABASE_URL=your_database_url

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

CLIPDROP_API_KEY=xxxx
GEMINI_API_KEY=xxxx

🐳 Start the Application
docker compose up --build

🌐 Access the App

Frontend → http://localhost:5173

Backend → http://localhost:3000

Once running, the frontend and backend will automatically communicate via Docker network.