const swaggerAutogen = require("swagger-autogen");
const dotenv = require("dotenv").config();

const doc = {
    info: {
        version: "1.0.0",
        title: "Api Calorie Tracker",
        description: "Development of a backend application to implement an app that manages my food/caloric activities. Having use of TypeScript and Postgresql"
    },
    host: `localhost:${process.env.PORT_SERVER}`,
    schemes: ["http", "https"],
    securityDefinitions: {
        apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        }
    },
};

const outputFile = "./swagger/swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);