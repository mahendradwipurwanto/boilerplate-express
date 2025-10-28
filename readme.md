# 🏡 wohnee-be: Backend for Wohnee App

Backend API for the Wohnee app, providing data and services for managing your living space. 

![License](https://img.shields.io/github/license/perspektive-dev/wohnee-be)
![GitHub stars](https://img.shields.io/github/stars/perspektive-dev/wohnee-be?style=social)
![GitHub forks](https://img.shields.io/github/forks/perspektive-dev/wohnee-be?style=social)
![GitHub issues](https://img.shields.io/github/issues/perspektive-dev/wohnee-be)
![GitHub pull requests](https://img.shields.io/github/issues-pr/perspektive-dev/wohnee-be)
![GitHub last commit](https://img.shields.io/github/last-commit/perspektive-dev/wohnee-be)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [How to Run the Code](#-how-to-run-the-code)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [FAQ](#faq)
- [License](#license)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

---

## About

The `wohnee-be` project serves as the backend API for the Wohnee application, a platform designed to simplify and enhance the management of your living space. It provides the necessary data and services for user authentication, property management, task scheduling, and communication features within the Wohnee ecosystem. This backend is built with TypeScript and Node.js, ensuring a robust and scalable foundation for the application.

This project aims to solve the complexities of managing a shared living space by providing a centralized system for organizing tasks, tracking expenses, and facilitating communication. The target audience includes individuals, roommates, and property managers looking to streamline their living arrangements.

Key technologies used in this project include TypeScript, Node.js, Express.js, and PostgreSQL. The architecture follows a RESTful API design, with endpoints for handling authentication, property data, task management, and other related services. The unique selling point of this backend is its focus on providing a seamless and intuitive experience for managing all aspects of a shared living space.

---

## ✨ Features

- 🎯 **User Authentication** – Secure registration, login, and token-based authentication.
- ⚡ **Property Management** – Create, manage, and track properties and occupants.
- 📅 **Task Scheduling** – Assign and track household tasks.
- 💬 **Communication** – Messaging or notification system for occupants.
- 📊 **Expense Tracking** – Split bills and manage shared expenses.
- 🔒 **Security** – JWT, validation, and secure data storage.
- 🛠️ **Extensible** – Modular design for future scalability.

---

## 🎬 Demo

🔗 **Live Demo**: [https://wohnee.example.com/api](https://wohnee.example.com/api)  
(Placeholder URL — replace with actual deployment)

---

## 🚀 Quick Start

Clone and run in 3 steps:

```bash
git clone https://github.com/perspektive-dev/wohnee-be.git
cd wohnee-be
npm install && npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to view the API or documentation.

---

## 📦 Installation

### Prerequisites

- Node.js **v20+**
- npm
- Git
- PostgreSQL

### From Source

```bash
git clone https://github.com/perspektive-dev/wohnee-be.git
cd wohnee-be
npm install
npm run build
npm run dev
```

---

## 🧭 How to Run the Code

Follow these simple steps to set up and run the Wohnee Backend locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/perspektive-dev/wohnee-be.git
cd wohnee-be
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Copy the example `.env` file and update configurations — especially the **database** settings.

```bash
cp .env.example .env
```

Then edit `.env` to match your setup:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/wohnee
DATABASE_SSL=false
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

> 💡 **Tip:** Ensure PostgreSQL is running and accessible before starting the app.

### 4️⃣ Use Node.js v20+

Confirm Node.js version:

```bash
node -v
```

If using **nvm**:

```bash
nvm use 20
```

### 5️⃣ Import Postman Collection

1. Import the **Postman Collection** into Postman.
2. Set the `HOST` environment variable to your backend host (e.g., `http://localhost:3000`).

### 6️⃣ Start the Development Server

Run the app:

```bash
npm run dev
```

> ⚙️ The server will automatically:
> - Create required database tables if they don’t exist
> - Seed the default required data automatically

### 7️⃣ Verify Everything Works

Expected startup log:

```
🚀 Server running at http://localhost:3000
✅ Database connected successfully
```

Then try:

```
GET http://localhost:3000/api/v1/health
```

🎉 You’re all set — Wohnee Backend is running locally!

---

## 💻 Usage

Example:

```javascript
fetch('http://localhost:3000/api/users/1')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
```

---

## ⚙️ Configuration

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/wohnee
DATABASE_SSL=false
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

---

## API Reference

Example:

**Endpoint:** `GET /api/users/:id`

**Description:** Retrieves user information by ID.

**Response:**

```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

---

## 📁 Project Structure

```
wohnee-be/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Middleware functions
│   ├── utils/            # Helper functions
│   ├── app.ts            # App configuration
│   └── server.ts         # Server bootstrap
├── config/               # Configuration files
├── tests/                # Unit/integration tests
├── .env.example
├── package.json
├── README.md
└── LICENSE
```

---

## 🤝 Contributing

We welcome contributions!  
Check out our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Steps

1. 🍴 Fork the repository
2. 🌟 Create your branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration
```

---

## 🚢 Deployment

Example (Heroku):

```bash
heroku create
git push heroku main
```

Set environment variables in your Heroku app before deployment.

---

## ❓ FAQ

Q: What happens on first run?  
A: The app automatically creates necessary database tables and seeds default data.

Q: Which Node version should I use?  
A: Node.js v20+ is required.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

- 📧 **Email:** mahendradwipurwanto@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/perspektive-dev/wohnee-be/issues)
- 📖 **Documentation:** [https://wohnee.example.com/docs](https://wohnee.example.com/docs) *(placeholder)*

---

## 🙏 Acknowledgments

- [Express](https://expressjs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [TypeORM](https://typeorm.io/)
- 💡 Thanks to all [contributors](https://github.com/perspektive-dev/wohnee-be/contributors)
