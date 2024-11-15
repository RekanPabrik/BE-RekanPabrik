
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
const PORT = process.env.PORT;
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RekanPabrik Documentation API',
      version: '1.0.0',
      description: 'Guide / panduan penggunaan API RekanPabrik',
    }, 
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Server lokal"
      },
    ],
  },
  apis: [path.join(__dirname, '../docs/*.swagger.js')],
 
};

const specs = swaggerJSDoc(options);

module.exports = {
  specs,
  swaggerUi,
};