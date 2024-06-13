import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Tareas',
      version: '1.0.0',
      description: 'Una descripción simple de la API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // path to the API files
};

const specs = swaggerJsDoc(options);

export default specs;