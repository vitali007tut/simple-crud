# CRUD API with Cluster and Load Balancer

## 📦 Overview

This project is a simple CRUD API built with Node.js and TypeScript. It supports horizontal scaling using Node.js Cluster API and includes a custom load balancer that distributes requests across multiple worker instances.

---

## 🚀 Features

- RESTful API for managing users
- In-memory database
- Full CRUD support:
    - `GET /api/users`
    - `GET /api/users/:id`
    - `POST /api/users`
    - `PUT /api/users/:id`
    - `DELETE /api/users/:id`
- Error handling for:
    - Invalid UUIDs
    - Missing fields
    - Non-existent users
    - Server errors
- `.env` configuration
- Development and production modes
- Cluster mode with round-robin load balancing

---

## 🧠 Architecture

### Load Balancer (balancer.ts)

- Listens on `PORT` (default: 4000)
- Handles all CRUD operations
- Stores users in a shared in-memory array

### Workers (worker.ts)

- Listen on `PORT + n`
- Respond to auxiliary requests (e.g., `/ping`)
- Demonstrate parallelism and scalability

### Cluster Starter (startCluster.ts)

- Spawns multiple worker processes
- Starts the load balancer

---

## 📁 Project Structure

```Shell
src/
├── controllers/
├── models/
├── routes/
├── cluster/
│   ├── balancer.ts
│   ├── worker.ts
│   ├── workerServer.ts
│   └── startCluster.ts
├── __tests__/
└── index.ts
```

---

## ⚙️ Scripts

```Json
"scripts": {
  "start:dev": "ts-node-dev src/index.ts",
  "start:prod": "tsc && node dist/index.js",
  "start:multi": "ts-node src/cluster/startCluster.ts",
  "test": "jest"
}
```

---

## 🧪 Testing

Tests are written using `jest` and `supertest`. They cover:

1. Getting all users
2. Creating a user
3. Retrieving a user by ID
4. Updating a user
5. Deleting a user
6. Verifying deletion

---

## 📄 .env.example

```Json
PORT=4000
```

---

## ✅ How to Run

### Development

```Shell
npm run start:dev
```

### Production

```Shell
npm run start:prod
```

### Cluster Mode

```Shell
npm run start:multi
```

---

## 📬 API Example

```Shell
# Create user
curl -X POST http://localhost:4000/api/users   -H "Content-Type: application/json"   -d '{"username": "Alice", "age": 30, "hobbies": ["coding"]}'

# Get all users
curl http://localhost:4000/api/users
```

---

## 🛠️ Technologies

- Node.js
- TypeScript
- ts-node-dev
- uuid
- dotenv
- Jest + Supertest