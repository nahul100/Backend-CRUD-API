require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const PORT = 3000;
const { pool, initDatabase } = require('./db');
//const openapi = YAML.load('./openapi.yaml');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());

app.use('/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/', (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"]
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: "ok"
  });
});

app.get('/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
  const task = db
        .prepare('SELECT * FROM tasks WHERE id = ?')
        .get(req.params.id);
      
      if (!task) {
      return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

// CREATE task
app.post('/tasks', (req, res) => {
    const { title, done = 0 } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "title is required"
        });
    }

    const result = db
        .prepare('INSERT INTO tasks (title, done) VALUES (?, ?)')
        .run(title, done ? 1 : 0);

    const newTask = db
        .prepare('SELECT * FROM tasks WHERE id = ?')
        .get(result.lastInsertRowid);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
});
// UPDATE task
app.put('/tasks/:id', (req, res) => {
    const { title, done } = req.body;

    const task = db
        .prepare('SELECT * FROM tasks WHERE id = ?')
        .get(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    db.prepare(`
        UPDATE tasks
        SET title = ?, done = ?
        WHERE id = ?
    `).run(
        title,
        done ? 1 : 0,
        req.params.id
    );

    const updatedTask = db
        .prepare('SELECT * FROM tasks WHERE id = ?')
        .get(req.params.id);

    res.json({
        message: "Task updated successfully",
        task: updatedTask
    });
});
// DELETE task
app.delete('/tasks/:id', (req, res) => {
    const task = db
        .prepare('SELECT * FROM tasks WHERE id = ?')
        .get(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    db.prepare('DELETE FROM tasks WHERE id = ?')
        .run(req.params.id);

    res.json({
        message: "Task deleted successfully",
        task
    });
});
initDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database initialization failed:', error);
    });
