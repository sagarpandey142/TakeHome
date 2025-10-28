const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "Product Service", version: "1.0.0" },
  paths: {
    "/products": {
      get: {
        summary: "Get all products",
        responses: {
          200: { description: "OK" }
        }
      }
    }
  }
};

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
