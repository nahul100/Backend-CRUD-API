require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const PORT = 3000;
const { pool, initDatabase } = require('./db');
const supabase = require('./supabase');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());

app.use('/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));


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

app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (error) {
        console.error('Error reading tasks:', error);
        res.status(500).json({
            error: 'Database error'
        });
    }
});

// GET task by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error reading task:', error);
        res.status(500).json({
            error: 'Database error'
        });
    }
});

// CREATE task
app.post('/tasks', async (req, res) => {
    const { title, done = 0 } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "title is required"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO tasks (title, done)
             VALUES ($1, $2)
             RETURNING *`,
            [title, done ? 1 : 0]
        );

        res.status(201).json({
            message: "Task created successfully",
            task: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error"
        });
    }
});
// UPDATE task
app.put('/tasks/:id', async (req, res) => {
    const { title, done } = req.body;

    try {
        const result = await pool.query(
            `UPDATE tasks
             SET title = $1, done = $2
             WHERE id = $3
             RETURNING *`,
            [title, done ? 1 : 0, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error"
        });
    }
});
// DELETE task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1',
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error"
        });
    }
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