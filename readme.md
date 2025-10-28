# 🏡 Boilerplate: Backend API

Boilerplate Backend API, providing data and services for managing your app. 

![License](https://img.shields.io/github/license/mahendradwipurwanto/boilerplate-express)
![GitHub stars](https://img.shields.io/github/stars/mahendradwipurwanto/boilerplate-express?style=social)
![GitHub forks](https://img.shields.io/github/forks/mahendradwipurwanto/boilerplate-express?style=social)
![GitHub issues](https://img.shields.io/github/issues/mahendradwipurwanto/boilerplate-express)
![GitHub pull requests](https://img.shields.io/github/issues-pr/mahendradwipurwanto/boilerplate-express)
![GitHub last commit](https://img.shields.io/github/last-commit/mahendradwipurwanto/boilerplate-express)

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

# 🚀 Boilerplate Express REST API

The **Boilerplate Express** project serves as a **ready-to-use backend REST API starter** built with **TypeScript** and **Node.js (Express.js)**.  
It provides a robust foundation for modern backend development, featuring **SSO authentication**, **automatic user registration**, **RSA-based signature verification**, and **modular CRUD endpoints** — all pre-configured and production-ready.

---

## 🧩 About the Project

This boilerplate is designed for developers and teams who want to **accelerate backend setup** without spending time on repetitive configurations such as authentication, request validation, and routing structure.  
It enables you to focus on building business features while maintaining a clean and secure backend architecture.

---

## ✨ Key Features

- 🔐 **Authentication with SSO**  
  Supports **single sign-on (SSO)** login flow with **automatic user registration** for new users.

- 🔏 **RSA Signature Verification**  
  Ensures request authenticity using **public/private RSA key encryption**.

- 🧱 **Prebuilt CRUD Modules**  
  Includes base controllers and services for **Create, Read, Update, Delete** operations.

- ⚙️ **TypeScript + Express.js**  
  Type-safe, modular, and scalable codebase following **clean architecture principles**.

- 🗄️ **Database Ready (PostgreSQL)**  
  Preconfigured with PostgreSQL and easily adaptable to other databases.

- 🌍 **Environment Configuration**  
  `.env` support for flexible and secure configuration across environments.

---

## 🛠️ Tech Stack

| Technology | Description |
|-------------|-------------|
| **TypeScript** | Strongly-typed JavaScript for scalable development |
| **Node.js** | High-performance JavaScript runtime |
| **Express.js** | Minimalist and powerful web framework |
| **PostgreSQL** | Reliable and performant relational database |
| **RSA Encryption** | Secure signature verification for API requests |

---

## 🚀 Quick Start

Clone and run in 3 steps:

```bash
git clone https://github.com/mahendradwipurwanto/boilerplate-express.git
cd boilerplate express
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
git clone https://github.com/mahendradwipurwanto/boilerplate-express.git
cd boilerplate express
npm install
npm run build
npm run dev
```

---

## 🧭 How to Run the Code

Follow these simple steps to set up and run the Express REST API Backend locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mahendradwipurwanto/boilerplate-express.git
cd boilerplate express
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
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/boilerplate
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

🎉 You’re all set — Express REST API Backend is running locally!

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
DATABASE_URL=postgresql://user:password@localhost:5432/boilerplate
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
boilerplate express/
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
- 🐛 **Issues:** [GitHub Issues](https://github.com/mahendradwipurwanto/boilerplate-express express/issues)
- 📖 **Documentation:** [https://boilerplate.example.com/docs](https://boilerplate.example.com/docs) *(placeholder)*

---

## 🙏 Acknowledgments

- [Express](https://expressjs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [TypeORM](https://typeorm.io/)
- 💡 Thanks to all [contributors](https://github.com/mahendradwipurwanto/boilerplate-express express/contributors)
