import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aplicación gestión de proyectos",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID del usuario",
              readOnly: true,
            },
            name: {
              type: "string",
              description: "Nombre del usuario",
            },
            email: {
              type: "string",
              description: "Correo electrónico del usuario",
            },
            password: {
              type: "string",
              description: "Contraseña del usuario",
            },
            rol: {
              type: "string",
              enum: ["admin", "user"],
              description: "Rol del usuario",
            },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID del proyecto",
              readOnly: true,
            },
            name: {
              type: "string",
              description: "Nombre del proyecto",
            },
            description: {
              type: "string",
              description: "Descripción del proyecto",
            },
            startDate: {
              type: "string",
              format: "date-time",
              description: "Fecha de inicio del proyecto",
            },
            finalDate: {
              type: "string",
              format: "date-time",
              description: "Fecha final del proyecto",
            },
            state: {
              type: "string",
              enum: ["No started", "In progress", "Completed"],
              description: "Estado del proyecto",
            },
            userId: {
              type: "integer",
              description: "ID del usuario que creó el proyecto",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID de la tarea",
              readOnly: true,
            },
            name: {
              type: "string",
              description: "Nombre de la tarea",
            },
            description: {
              type: "string",
              description: "Descripción de la tarea",
            },
            creationDate: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación de la tarea",
            },
            updateDate: {
              type: "string",
              format: "date-time",
              description: "Fecha de actualización de la tarea",
            },
            state: {
              type: "string",
              enum: ["Pending", "In progress", "Completed"],
              description: "Estado de la tarea",
            },
            projectId: {
              type: "integer",
              description: "ID del proyecto al que pertenece la tarea",
            },
          },
        },
      },
    },
  },
  apis: [
    "src/routes/auth.routes.js",
    "src/routes/users.routes.js",
    "src/routes/projects.routes.js",,
    "src/routes/task.routes.js"
  ], // path to the API files
};

const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger initialized in /api-docs");
};
