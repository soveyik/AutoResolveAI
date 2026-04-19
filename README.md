# AutoResolve - Event-Driven Support Ticketing System

A distributed support ticketing system built with Node.js, Python, PostgreSQL, and RabbitMQ. Features an asynchronous NLP pipeline to auto-categorize incoming tickets using HuggingFace.

## Features
- **NestJS Core API**: Handles CRUD operations and user authentication (JWT).
- **FastAPI AI Worker**: Consumes RabbitMQ events and processes ticket sentiment asynchronously.
- **Vanilla JS Client**: A lightweight, modern SI client for demonstrating the event-driven architecture.

## Installation

### 1. Infrastructure
Run the following to start PostgreSQL, Redis, and RabbitMQ.
```bash
docker-compose up -d
```

### 2. Core API (Node.js)
```bash
cd core-api
npm install
npm run start:dev
```
Runs on `http://localhost:3000`.

### 3. AI Worker (Python)
```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 4. Client Web UI
Open `web-ui/index.html` in your browser.
