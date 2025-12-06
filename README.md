- give it a star⭐
# Snip-Shell

**Snip-Shell** is a full-stack web application for organizing, managing, and sharing content. Users can collect URLs, Twitter posts, and YouTube videos, organize them in a personal dashboard, and generate shareable links for public access.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Authentication & Security](#authentication--security)
- [Content Types](#content-types)
- [Getting Started](#getting-started)

---

## Overview
Snip-Shell enables users to:
- **Collect Content:** Save URLs, Twitter embeds, and YouTube videos with title and description.
- **Organize:** View and manage saved content in a personal dashboard.
- **Share:** Generate a unique hash-based link to publicly display collections.
- **Discover:** Browse other users' shared content without authentication.

---

## Features
- User authentication (signup/signin) with JWT.
- Content creation, deletion, and management.
- Dashboard for personal content management.
- Public sharing via unique hash links.

---

## System Architecture
- **Three-tier architecture**: Frontend (React) ↔ Backend (Express) ↔ Database (MongoDB).
- Client and server communicate via REST APIs.
- Server handles authentication, content management, and shareable link generation.
- Stateless JWT authentication ensures secure session management.

---

## Technology Stack

**Client:**
| Category | Technology | Purpose |
|----------|-----------|--------|
| Framework | React 18 | UI library |
| Language | TypeScript 5 | Type safety |
| Styling | Tailwind CSS 4 | Styling |
| Routing | React Router DOM 7 | Client-side routing |
| HTTP Client | Axios 1 | API requests |

**Server:**
| Category | Technology | Purpose |
|----------|-----------|--------|
| Runtime | Node.js | Server runtime |
| Framework | Express.js | REST API server |
| Database | MongoDB | Document database |
| ODM | Mongoose | Object modeling |
| Authentication | jsonwebtoken | JWT tokens |
| Password Hashing | bcrypt | Secure passwords |
| Validation | Zod | Schema validation |

---

## Project Structure
```
Snip-Shell/
├── client/
│   ├── src/
│   │   ├── App.tsx               # Routes
│   │   ├── main.tsx              # Entry point
│   │   ├── pages/                # Pages (Home, Dashboard, SharedView, Error)
│   │   ├── layout/               # Layout components (Header, Hero, Sidebar, Footer)
│   │   ├── components/           # Reusable UI (Card, Modal)
│   │   ├── context/              # React Context (AuthContext, AddContext)
│   │   └── assets/               # Static assets
│   ├── package.json
│   └── vite.config.ts
└── server/
    ├── src/
    │   ├── controllers/logic.ts  # Main business logic
    │   ├── model/userdb.ts       # Mongoose models
    │   ├── schema/user.ts        # Zod validation schemas
    │   ├── middleware/           # Express middleware
    │   └── config.ts             # Configuration constants
    └── package.json
```

---

## Authentication & Security
- JWT-based authentication.
- Password hashing with bcrypt.
- Route protection using ProtectedRoute component.
- Content queries filtered by userId.
- Request validation using Zod schemas.

---

## Content Types
- **url**: Generic web links  
- **twitter**: Embedded Twitter posts  
- **youtube**: Embedded YouTube videos  

Each content item includes: `title`, `link`, `type`, `description`, `userId`, `tags[]`.

---

## Getting Started
1. **Clone the repository**
```bash
git clone https://github.com/nikhil008-git/Snip-Shell.git
```
2. **Install dependencies**
```bash
# Client
cd Snip-Shell/client
npm install

# Server
cd ../server
npm install
```
3. **Configure environment variables**
- Create a `.env` in `server/` with MongoDB URI, JWT secret, and other configs.

4. **Run the application**
```bash
# Server
npm run dev

# Client
npm run dev
```

5. **Access the app**
- Client: `http://localhost:5173`
- Server API: `http://localhost:3000/api`
