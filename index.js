const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const PORT = 3000;
const tasks = require('./MOCK_DATA.json');
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
  res.json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

// CREATE task
app.post('/tasks', (req, res) => {

  const { id,title,done} = req.body;

  if (!id) {
    return res.status(400).json({
      message: "id is required"
    });
  }

  const newTask = {
   // id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    id,
    title,
    done
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task created successfully",
    task: newTask
  });

});
// UPDATE task
app.put('/tasks/:id', (req, res) => {

  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

   const { id,title,done} = req.body;
  task.id = id ?? task.id;
  task.title = title ?? task.title;
  task.done = done ?? task.done;

  res.json({
    message: "Task updated successfully",
    task
  });

});
// DELETE task
app.delete('/tasks/:id', (req, res) => {

  const index = tasks.findIndex(t => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(index, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0]
  });

});
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

