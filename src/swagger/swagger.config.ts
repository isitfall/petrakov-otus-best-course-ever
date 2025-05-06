import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Best Course ever OTUS API',
            version: '1.0.0',
            description: 'API documentation for the Best Course ever OTUS project',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/routes/*.ts'], // Path to your route files
};

export default swaggerJsdoc(options);
