# Job Application Tracker

A full-stack web application built with React, FastAPI, and SQLite to help users manage job applications, track progress, and stay organised during the job search process.

## Features

- Add new job applications
- Edit existing applications
- Delete applications
- Filter by status
- Search by company or position
- Sort applications
- Dashboard summary cards
- Responsive design
- Persistent data storage with SQLite

## Tech Stack

### Frontend

- React
- JavaScript
- CSS
- Axios

### Backend

- Python
- FastAPI
- SQLAlchemy

### Database

- SQLite

## Project Structure

- frontend/
- backend/

## Frontend Structure

- src/
  - components/
    - FilterBar.jsx
    - FilterBar.css
    - JobCard.jsx
    - JobCard.css
    - JobForm.jsx
    - JobForm.css
    - JobList.jsx
    - JobList.css
    - SearchBar.jsx
    - SearchBar.css
    - SortBar.jsx
    - SortBar.css
    - Toast.jsx
    - Toast.css
  - services/
    - api.js
  - App.jsx
  - App.css

## Backend Structure

- main.py
- database.py
- models.py
- schemas.py
- jobs.db

## Installation and Setup

### 1. Clone the repository

bash
git clone https://github.com/filibeli9/job-application-tracker.git
cd job-application-tracker

### 2. Set up the backend

cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn sqlalchemy
uvicorn main:app --reload

Backend URL:
http://127.0.0.1:8000

API docs:
http://127.0.0.1:8000/docs

### 3. Set up the frontend

Open a new terminal:

cd frontend
npm install
npm install axios
npm run dev

Frontend URL:
http://localhost:5173

API Endpoints
• GET /jobs — get all jobs
• POST /jobs — create a new job
• PUT /jobs/{job_id} — update a job
• DELETE /jobs/{job_id} — delete a job

Data Model

Each job application includes:
• id
• company
• position
• status
• applied_date
• job_link
• notes

Status Options
• Applied
• Interview
• Rejected
• Offer

Future Improvements
• User authentication
• User-specific data
• PostgreSQL instead of SQLite
• Pagination
• Advanced validation
• Dark mode
• Deployment with Vercel and Render

Why I Built This Project

I built this project to improve my full-stack development skills using React and Python. It demonstrates CRUD operations, frontend-backend integration, responsive design, filtering, searching, sorting, and persistent data storage.

Learning Outcomes

Through this project, I practiced:
• Building reusable React components
• Managing state with React hooks
• Connecting React to a FastAPI backend
• Creating REST API endpoints
• Using SQLAlchemy with SQLite
• Structuring a full-stack application
• Improving UI/UX with filtering, searching, sorting, and feedback messages

Author

Gulbahar Balaban

License

This project is for learning and portfolio purposes.
