# 🩺 VitalCare Frontend

VitalCare Frontend is a modern web application that allows users to monitor
and manage their health vitals through a clean and user-friendly interface.

This frontend communicates with the **VitalCare API (Spring Boot)** and is part
of a **Bachelor Thesis project**.

---

## 🎯 Features

- User authentication (JWT)
- Health dashboard
- Manage:
  - Blood Pressure
  - Heart Rate
  - BMI
  - Lifestyle habits
- Responsive UI
- Clean project structure

---

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

---

## 📁 Project Structure

```
src/
├── assets
├── components
├── pages
├── services
├── hooks
├── types
├── App.tsx
├── main.tsx
└── index.css
```

---

## ⚙️ Setup & Installation

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Application runs at:
```
http://localhost:5173
```

---

## 🔗 API Configuration

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored securely in browser
4. Token attached to API requests

---

## 👨‍🎓 Academic Information

- Project Type: Bachelor Thesis
- Frontend: React + TypeScript
- Backend: Spring Boot
- Focus: UI, usability, and system integration

---

## 📌 Future Improvements

- Charts & analytics
- Dark mode
- Notifications
- PWA support

---

## 📄 License

Developed for academic purposes only.
