tomato-food-app/
git clone https://github.com/your-username/tomato-food-delivery.git

[![Food-Del Banner](frontend/public/header_img.png)](./)

# Food-Del 🍔🍕🍜

A full-stack food delivery platform with a modern user interface, robust backend, and an admin dashboard. Built with React, Node.js, Express, and MongoDB.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
	- [1. Clone the Repository](#1-clone-the-repository)
	- [2. Environment Variables](#2-environment-variables)
	- [3. Install Dependencies](#3-install-dependencies)
	- [4. Running the Apps](#4-running-the-apps)
- [Folder Overview](#folder-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
Food-Del/
│
├── admin/      # Admin dashboard (React + Vite)
├── backend/    # Backend API (Node.js + Express + MongoDB)
├── frontend/   # User-facing web app (React + Vite)
└── README.md   # Project documentation
```

## Features

- User authentication & authorization
- Browse, search, and filter food items
- Add to cart, place orders, and track order status
- Newsletter subscription
- Admin dashboard for managing food items, orders, and users
- Responsive UI for web and mobile
- Email notifications (order, newsletter)

## Tech Stack

- **Frontend & Admin:** React, Vite, CSS Modules
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** JWT Auth, Nodemailer, REST API, dotenv

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/sagnik-create/Food-Del.git
cd Food-Del
```

### 2. Environment Variables

- Copy `.env.example` to `.env` in `backend/` and fill in your MongoDB URI, JWT secret, and email credentials.
- (Optional) Add environment variables for frontend/admin if needed.

### 3. Install Dependencies

Open three terminals (or run sequentially):

```sh
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

### 4. Running the Apps

#### Backend (API Server)
```sh
cd backend
npm start
```
- Runs on [http://localhost:5000](http://localhost:5000) by default.

#### Frontend (User App)
```sh
cd frontend
npm run dev
```
- Runs on [http://localhost:5173](http://localhost:5173) by default.

#### Admin Dashboard
```sh
cd admin
npm run dev
```
- Runs on [http://localhost:5174](http://localhost:5174) by default (or as configured).

---

## Folder Overview

- **admin/**: React-based admin dashboard for managing food items, orders, and users.
- **backend/**: Express.js REST API, MongoDB models, authentication, and business logic.
- **frontend/**: User-facing React app for browsing, ordering, and account management.

---

## Contributing

Contributions are welcome! Please read the [Contributor Covenant Code of Conduct](./%E2%9C%A8%20Contributor%20Covenant%20Code%20of%20Conduct%20%E2%80%94%20GSSoC%20%E2%9C%A8) and open issues or pull requests for improvements.

---

## License

This project is licensed under the [MIT License](./LICENSE).
