require('dotenv').config();
const express = require('express');
const segmentsRoutes = require('./routes/segments');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = {
  openapi: '3.0.0',
  info: { title: 'Segment Service', version: '1.0.0' },
  paths: {
    '/segments/evaluate': {
      post: { summary: 'Evaluate segment', responses: { 200: { description: 'OK' } } }
    }
  }
};
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/segments', segmentsRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Segment service listening on ${PORT}`));
