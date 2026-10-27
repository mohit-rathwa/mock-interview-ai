# 🎯 InterviewAI — Autonomous AI-Powered Interview Preparation Platform

An end-to-end, AI-powered technical interview preparation and career strategy platform inspired by modern automated evaluation systems like **HackerRank Chakra**. 

InterviewAI analyzes target job descriptions alongside candidate resumes to generate personalized, deep technical questions, interviewer intention breakdowns, comprehensive match score rubrics, gap analyses, day-by-day study roadmaps, and ATS-tailored resume PDFs.

---

## ✨ Key Features & Architecture Highlights

### ⚡ 1. Zero-Friction Instant Demo (Guest Mode)
- **Try Without Signup:** Recruiters, interviewers, and candidates can experience the full AI pipeline immediately via `/demo` without creating an account.
- **Preset Quick-Selects:** Pre-loaded with Full-Stack, Frontend, and Backend job templates.

### 🧠 2. Adaptive AI Strategy Engine (Google Gemini)
- **Role-Specific Probing:** Tailored technical and behavioral questions generated using structured JSON schemas powered by Google's latest Gemini models.
- **Interviewer Intention & Model Answers:** Explains *why* the interviewer asks each question and what key concepts/trade-offs should be highlighted in your answer.
- **Match Score & Skill Gap Radar:** Computes quantifiable fit score (0-100%) and tags high, medium, and low severity skill gaps.
- **Preparation Roadmap:** Actionable, day-by-day study schedule targeting missing concepts.

### 📄 3. ATS-Tailored Resume PDF Generator
- Uses **Puppeteer** and Gemini to dynamically synthesize ATS-friendly, clean A4 resume PDFs tailored specifically to the requirements of the job description.

### 🔒 4. Production-Grade Security
- Cookie-based JWT authentication with **automatic token blacklisting** on logout.
- MongoDB TTL index auto-cleans blacklisted tokens after expiration.
- CORS origin whitelist supporting development and production deployments.
- Resource ownership validation on private endpoints.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend** | React 19, Vite 7, React Router 7, Axios, SCSS (Glassmorphism & animations) |
| **Backend** | Node.js, Express 5, Mongoose (MongoDB Atlas), Cookie-Parser, Multer |
| **AI / ML** | Google Gemini (`@google/genai`), Zod, Zod-to-JSON-Schema |
| **Document Processing** | `pdf-parse`, `puppeteer` (Headless Chrome PDF rendering) |
| **Deployment** | Vercel (Frontend & Serverless API) / Render (Express Web Service) |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 18
- MongoDB Atlas cluster or local MongoDB instance
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone the repository
```bash
git clone https://github.com/mohit-rathwa/mock-interview-ai.git
cd mock-interview-ai
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in `Backend/`:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```
Start backend:
```bash
npm run dev
# or for production
npm start
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```
Create a `.env` file in `Frontend/`:
```env
VITE_API_URL=http://localhost:3000
```
Start frontend development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Reference

### Authentication (`/api/auth`)
- `POST /register` — Register a new candidate
- `POST /login` — Authenticate and receive httpOnly cookie
- `GET /logout` — Invalidate token & add to blacklist
- `GET /get-me` — Retrieve authenticated user profile *(Protected)*

### Interview Engine (`/api/interview`)
- `POST /demo` — Instant demo generation with zero authentication *(Public)*
- `POST /` — Generate full report from PDF resume & job description *(Protected)*
- `GET /` — List user's past interview plans *(Protected)*
- `GET /report/:interviewId` — Fetch detailed interview plan *(Protected)*
- `POST /resume/pdf/:interviewReportId` — Generate and stream tailored resume PDF *(Protected)*

---

## 📂 Project Structure

```
mock-interview-ai/
├── Backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection
│   │   ├── controllers/     # Auth & Interview controllers (including Demo)
│   │   ├── middlewares/     # JWT auth guard & Multer 5MB PDF handler
│   │   ├── models/          # User, Blacklist (with TTL), InterviewReport schemas
│   │   ├── routes/          # Express API route declarations
│   │   └── services/        # Gemini AI prompt engine & Puppeteer PDF generator
│   ├── render.yaml          # Render deployment specification
│   ├── server.js            # Express server entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/        # Login, Register, Auth Context & Hooks
│   │   │   ├── interview/   # Dashboard (Home), Interactive Report, Instant Demo
│   │   │   └── landing/     # Modern animated Landing Page with glassmorphism
│   │   ├── app.routes.jsx   # Client-side router configuration
│   │   ├── App.jsx          # Providers wrapper
│   │   └── main.jsx         # React DOM entry
│   └── package.json
├── vercel.json              # Monorepo deployment & SPA rewrites configuration
└── README.md
```

---

## 📜 License
ISC License &bull; Created by [Mohit Rathwa](https://github.com/mohit-rathwa)
