
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
      description: 'Panduan penggunaan API RekanPabrik',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Server lokal",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Format token yang digunakan
          description: 'Masukkan token JWT Anda untuk mengakses endpoint.',
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Menerapkan otentikasi Bearer ke semua endpoint secara default
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