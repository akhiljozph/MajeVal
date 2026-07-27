import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MajeVal API Docs',
            version: '1.0.0',
            description: 'API documentation generated via swagger.'
        }
    },
    apis: ['./src/routes/*.ts']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };