import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My API',
    },
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);