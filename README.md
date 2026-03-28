# WasteNot Connect

A food waste reduction platform that connects surplus food donors with volunteers and those in need.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Recharts
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas

## Features

- Food donation listings with image upload and GPS location
- Volunteer registration and management
- Dashboard for donors and compost retailers
- Real-time impact charts
- JWT-based authentication

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Setup

1. Clone the repo
```bash
git clone <your-repo-url>
cd wastenot-connect
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Create `backend/.env`
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

5. Add your LocationIQ API key to `.env` in root
```
VITE_LOCATIONIQ_API_KEY=your_key
```

### Run

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.
