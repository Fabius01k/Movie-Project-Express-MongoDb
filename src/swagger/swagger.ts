import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Admin API',
        version: '1.0.0',
        description: 'API documentation for Admin operations',
    },
    servers: [
        {
            url: 'http://localhost:3300',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // apis: ['src/admin/router/admin-router.ts'],
    apis: ['src/swagger/user-admin.ts',
        'src/swagger/movie-admin.ts',
        'src/swagger/authentication.ts',
        'src/swagger/registration.ts'
    ],
};

export const swaggerSpec = swaggerJSDoc(options);

