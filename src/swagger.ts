import { Express } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function setupSwagger(app: Express): void {
  const options: Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My Express API!',
        version: '1.0.0',
      },
    },
    apis: ['./src/**/*.ts'],
  };

  const specs = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}