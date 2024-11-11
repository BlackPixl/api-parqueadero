const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Parking API',
    version: '1.0.0',
    description: 'API para administrar ingresos y salidas de vahiculos a un parqueadero',
    contact: {
      name: 'Soporte',
      email: 'soporte@example.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Server de desarrollo'
    }
  ],
  components: {
    schemas: {
      Vehicle: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Vehicle ID'
          },
          plate: {
            type: 'string',
            description: 'Vehicle plate number'
          },
          type: {
            type: 'string',
            enum: ['car', 'motorcycle'],
            description: 'Type of vehicle'
          },
          entryTime: {
            type: 'string',
            format: 'date-time',
            description: 'Time when vehicle entered parking'
          },
          exitTime: {
            type: 'string',
            format: 'date-time',
            description: 'Time when vehicle exited parking'
          },
          isParked: {
            type: 'boolean',
            description: 'Current parking status'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
