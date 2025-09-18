# RTC Bus Tracking Backend

This is the backend for a live RTC bus tracking system using drivers' mobile GPS. Built with Node.js, Express, MongoDB, and JWT authentication.

## Features
- Driver registration and login
- Update and fetch live bus locations
- JWT authentication for drivers

## Setup
1. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.
2. Install dependencies:
   ```
npm install
   ```
3. Start the server:
   ```
npm run dev
   ```

## API Endpoints
- `POST /api/auth/register` — Register driver and bus
- `POST /api/auth/login` — Driver login
- `POST /api/buses/update-location` — Update bus location (driver, JWT required)
- `GET /api/buses/locations` — Get all bus locations

## Folder Structure
- `src/models` — Mongoose models
- `src/routes` — Express routes
- `src/controllers` — Route controllers
- `src/middleware` — Auth middleware

---

Replace placeholder values in `.env` before running.
