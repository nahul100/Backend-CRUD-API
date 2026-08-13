# Task API — Dockerized PostgreSQL Backend

A RESTful Task API built with **Node.js**, **Express.js**, and **PostgreSQL**, with the complete application stack containerized using **Docker Compose**.

This project extends the previous CRUD API by replacing the local SQLite/in-memory storage with a persistent PostgreSQL database and running both the API and database together through Docker.

## Features

- RESTful API built with Express.js
- CRUD operations for task management
- PostgreSQL database
- PostgreSQL running inside Docker
- Persistent PostgreSQL storage using a Docker volume
- Environment-based database configuration
- Parameterized SQL queries
- Swagger UI for interactive API documentation
- Docker Compose for running the complete stack
- Database initialization and seed data
- Data persistence across container restarts
- HTTP status codes and error handling

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- `pg` (Node.js PostgreSQL driver)
- dotenv
- Swagger UI Express
- YAML

---

# Project Architecture

The application follows a simple layered structure:

```text
Client
   │
   │ HTTP Request
   ▼
Express API
   │
   ▼
Database Module / Repository
   │
   ▼
PostgreSQL
   │
   ▼
Docker Volume