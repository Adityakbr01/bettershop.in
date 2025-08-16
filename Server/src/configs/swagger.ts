import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";
import YAML from "yamljs";
import { constant } from "./_Config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base OpenAPI specification
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: constant.appName,
    version: constant.appVersion,
    description: "A modular API with Swagger documentation"
  },
  servers: [
    {
      url: `http://localhost:${constant.ENV.PORT}/api/v1`,
      description: "Development server"
    }
  ],
  components: {
    schemas: {},
    responses: {}
  }
};

// Load schema and component files explicitly
const schemas = {};
const responses = {};
const schemaFiles = [
  path.join(__dirname, "./../api/schemas/user.yaml"),
  path.join(__dirname, "./../api/schemas/product.yaml"),
  path.join(__dirname, "./../api/schemas/category.yaml"),
];

const componentFiles = [
  path.join(__dirname, "./../api/components/common.yaml")
];

schemaFiles.forEach(file => {
  const schemaContent = YAML.load(file);
  Object.assign(schemas, schemaContent);
});

componentFiles.forEach(file => {
  const componentContent = YAML.load(file);
  if (componentContent.responses) {
    Object.assign(responses, componentContent.responses);
  }
});

// Merge schemas and responses into swaggerDefinition
swaggerDefinition.components.schemas = schemas;
swaggerDefinition.components.responses = responses;

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "./../api/paths/**/*.yaml")]
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
