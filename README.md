# 🍅 Tomato – Full-Stack Food Delivery Web App

🚀 Just Launched!  
**Tomato** is a modern, full-stack food delivery platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a seamless experience for users to browse, filter, and order delicious meals – complete with secure payments, real-time feedback, and responsive design.

---

## 📸 Preview

> Live Demo → https://tomato-fda.netlify.app/
> Admin Page - https://tomatofooddel-admin.netlify.app/
> GitHub → https://github.com/Skrishna0703/Food-Del

---

## ✨ Features

- 🍴 **Dynamic Menu Listing** – Browse meals with category filters
- 🔍 **Live Search & Filtering** – Quickly find your favorite dishes
- 🛒 **Smart Cart System** – Add/remove/manage quantity with persistent local state
- 🔐 **JWT Authentication** – Secure login/signup flow
- 💳 **Payment Integration** – Seamless checkout using Razorpay (test mode)
- 📩 **Real-time Contact Form** – Web3Forms-powered feedback system
- 🌗 **Responsive UI** – Works perfectly on mobile, tablet, and desktop
- 🔔 **Toast Alerts** – Notify users on key actions (add to cart, login, etc.)
- 🧠 **State Management** – React Context API + Local Storage
- 🌐 **Deployment Ready** – Frontend hosted on Netlify, backend on Render

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React.js, Tailwind CSS, Toastify    |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB Atlas                       |
| Auth         | JSON Web Tokens (JWT)               |
| Payments     | Razorpay (test mode)                |
| Forms/API    | Web3Forms                           |
| Deployment   | Netlify (frontend), Render (backend)|

---

## 📂 Project Structure

```
tomato-food-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── tailwind.config.js
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env                    # Environment variables
├── README.md
└── package.json
```

---

## 🧑‍💻 Local Development Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/tomato-food-delivery.git
cd tomato-food-delivery
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Install Server Dependencies

```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

> ⚠️ Never commit `.env` files to source control

### 5. Start the Development Servers

Open two terminals:

#### Terminal 1 – Start Backend:

```bash
cd server
npm run dev
```

#### Terminal 2 – Start Frontend:

```bash
cd client
npm run dev
```

> App runs at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing & QA

Manual testing has been performed on:

- ✅ Chrome, Firefox, Brave browsers
- ✅ Mobile (Android Chrome, iOS Safari)
- ✅ Multiple screen sizes via DevTools
- ✅ Razorpay sandbox mode
- ✅ Feedback submission via Web3Forms

> Automated testing is not yet implemented.

---

## 🙋‍♂️ Contribution Guidelines

Want to improve Tomato? Feel free to fork and contribute!

### To Contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute it with proper attribution.

---

## 🤝 Acknowledgements

- Inspired by Zomato, Swiggy
- Razorpay & Web3Forms for dev-friendly APIs
- React Community & Tailwind CSS contributors

---

## 🔗 Useful Links

- 🖥 [Frontend (Netlify)](https://lnkd.in/gMfKhaTp)
- ⚙️ [Backend (Render)](https://render.com/)
- 📦 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- 📘 [Razorpay Docs](https://razorpay.com/docs/)
