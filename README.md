<div align="center">

<!-- Banner / Logo -->
<img src="docs/images/banner.png" alt="MessApp Banner" width="40%" />

# MessApp - Real-Time Chat Application

**A Monorepo Project including Frontend (React) and Backend (Node.js)**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?logo=socket.io&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-336791?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 📖 Introduction

**MessApp** is a comprehensive real-time chat application featuring user registration, authentication, user search, and instant messaging with file attachments. This repository utilizes a **Monorepo** architecture, housing the source code for both the **Client (Frontend)** and the **Server (Backend)**.

---

## 🖼️ User Interface

| Login Page | Chat Interface | User Profile |
|---|---|---|
| ![Login](docs/images/login.png) | ![Chat](docs/images/chat.png) | ![Profile](docs/images/profile.png) |

---

## ✨ Key Features

- 🔐 **Authentication**: Registration and login with password hashing (bcrypt), JWT tokens, and email verification (Nodemailer).
- 💬 **Real-time Communication**: Instant messaging powered by **Socket.IO** including "typing..." indicators and "seen" receipts.
- 🖼️ **Image Sharing**: Support for image attachments and previews via Multer upload.
- 👤 **User Profiles**: Manage personal information and crop avatars directly in the browser.
- 🎨 **Stylish UI**: Hand-drawn style message bubbles using **Rough.js**.

---

## 📁 Project Structure

```
MessApp/
├── client/           # React 19 Application (Vite)
├── server/           # Node.js Application (Express & Socket.IO)
├── docs/             # Documentation assets (Images)
├── README.md         # Project documentation
└── .gitignore        # Shared Git ignore rules
```

---

## 🚀 Installation and Setup

### 1. System Requirements

- **Node.js**: >= 18
- **Docker & Docker Compose**: For running the PostgreSQL database locally

### 2. Server (Backend) Setup

Navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder with the following configuration:
```env
PORT=8000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=messapp
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_google_app_password
```

> **Note:** Make sure your `.env` file credentials match the ones in `docker-compose.yml` (default `postgres`/`postgres`).

### 3. Database Setup (Docker)

To start the PostgreSQL database and automatically initialize the tables, run the following from the root directory:
```bash
docker-compose up -d
```

### 4. Start the Server:
```bash
npm run dev
```
The server will run at `http://localhost:8000`.

### 5. Client (Frontend) Setup

Open a new terminal and navigate to the `client` directory:
```bash
cd client
npm install
```

Configure the API connection to the Server in the respective files if necessary (defaults to localhost:8000).

Start the Client:
```bash
npm run dev
```
The application will run at `http://localhost:5173`.

---

## 🤝 Contributing

Contributions are always welcome! Please Fork the repository, create a new branch, commit your changes, and submit a Pull Request.

---

## 📄 License

This project is licensed under the [MIT](LICENSE) License.
