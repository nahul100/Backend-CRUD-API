const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const PORT = 3000;
const tasks = require('./MOCK_DATA.json');
//const openapi = YAML.load('./openapi.yaml');
const swaggerDocument = YAML.load('./swagger.yaml');

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




app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

