import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Astros E-commerce Documentation",
      description:
        "Documentation of a Ecommerce API-Rest application made with Express and documented with Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

export const specs = swaggerJsdoc(options);
