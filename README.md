# Task API

A simple RESTful Task API built with **Node.js**, **Express.js**, **SQLite**, and **Swagger UI** as part of the FlyRank AI Backend Engineering Internship.

This project demonstrates the fundamentals of backend API development, including RESTful CRUD operations, database integration, SQL queries, persistent data storage, and API documentation.

## Features

- RESTful API built with Express.js
- Full CRUD operations for task management
- SQLite database for persistent storage
- Automatic database and table creation
- Automatic seeding of three example tasks then added task
- SQL-based data retrieval and modification
- Interactive API documentation using Swagger UI
- JSON request and response format
- HTTP status codes and error handling
- Database remains available across server restarts

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Swagger UI Express
- YAML / OpenAPI

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/{id}` | Retrieve a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/{id}` | Update an existing task |
| DELETE | `/tasks/{id}` | Delete a task |

## Database

This project uses **SQLite** as its database.

SQLite was chosen for this stage because it is lightweight, requires no separate database server, and stores the application data in a single database file.
<img width="1080" height="923" alt="Screenshot 2026-08-09 232015" src="https://github.com/user-attachments/assets/8134ca95-510a-45f5-8287-05928948ee0a" />
