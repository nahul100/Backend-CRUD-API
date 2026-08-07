# Task API

A simple RESTful Task API built with **Node.js**, **Express.js**, and **Swagger UI** as part of the FlyRank AI Backend Engineering Internship.

This project demonstrates the fundamentals of REST API development by implementing CRUD (Create, Read, Update, Delete) operations on an in-memory task list. The API follows REST principles and provides endpoints to create, retrieve, update, and delete tasks.

## Features

- RESTful API built with Express.js
- CRUD operations for task management
- In-memory data storage (no database required)
- Interactive API documentation using Swagger UI
- JSON request and response format
- Proper HTTP status codes and error handling

## Technologies Used

- Node.js
- Express.js
- Swagger UI Express
- YAML (Swagger Documentation)

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | API information |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/{id}` | Retrieve a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/{id}` | Update an existing task |
| DELETE | `/tasks/{id}` | Delete a task |

## Running the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node index.js
```

The server will run at:

```
http://localhost:3000
```

Swagger documentation is available at:

```
http://localhost:3000/docs
```

## Project Structure

```
Backend-CRUD-api/
│── index.js
│── swagger.yaml
│── package.json
└── README.md
```
## Data Storage

This project stores task data in a local **JSON file (`MOCK_DATA.json`)** instead of a database. The API reads and updates this file during CRUD operations. This approach keeps the project simple while providing hands-on experience with REST API development before introducing a database in later assignments.

## Working Principle of REST API 

Client
   │
HTTP Request
   │
   ▼
Express Server
   │
Route
   │
Business Logic
   │
 tasks[]
   │
JSON Response
   ▼
Client

## Swagger URL

http://localhost:3000/docs/
