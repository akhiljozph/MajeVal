import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MajeVal API Docs',
            version: '1.0.0',
            description: 'API documentation generated via swagger.'
        },
        servers: [
            {
                url: '/',
                description: 'Current server'
            }
        ],
        components: {
            schemas: {
                ErrorMessage: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Something went wrong'
                        }
                    }
                },
                Country: {
                    type: 'object',
                    required: ['code', 'countryCode', 'countryName'],
                    properties: {
                        code: {
                            type: 'string',
                            example: 'IND',
                            description: 'Unique short code (e.g. IND for India)'
                        },
                        countryCode: {
                            type: 'string',
                            example: '+91'
                        },
                        countryName: {
                            type: 'string',
                            example: 'India'
                        }
                    }
                },
                AccountInfo: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        firstName: { type: 'string', example: 'Jane' },
                        middleName: { type: 'string', example: 'A' },
                        lastName: { type: 'string', example: 'Doe' },
                        email: { type: 'string', format: 'email', example: 'jane@example.com' },
                        country: { type: 'string', example: 'IND' },
                        mobileNumber: { type: 'string', example: '+1234567890' },
                        dateOfBirth: { type: 'string', format: 'date', example: '1995-05-20' },
                        username: { type: 'string', example: 'janedoe' },
                        gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER'] },
                        role: {
                            type: 'string',
                            enum: ['SUPERADMIN', 'ADMIN', 'EXAMINER', 'EXAMINEE']
                        }
                    }
                },
                SignupRequest: {
                    type: 'object',
                    required: [
                        'firstName',
                        'email',
                        'country',
                        'mobileNumber',
                        'dateOfBirth',
                        'username',
                        'password',
                        'gender',
                        'role'
                    ],
                    properties: {
                        firstName: { type: 'string', minLength: 2, example: 'Jane' },
                        middleName: { type: 'string', example: 'A' },
                        lastName: { type: 'string', example: 'Doe' },
                        email: { type: 'string', format: 'email', example: 'jane@example.com' },
                        country: { type: 'string', example: 'IND' },
                        mobileNumber: {
                            type: 'string',
                            example: '+1234567890',
                            description: 'E.164 format'
                        },
                        dateOfBirth: { type: 'string', format: 'date', example: '1995-05-20' },
                        username: { type: 'string', example: 'janedoe' },
                        password: { type: 'string', format: 'password', example: 'Secret123!' },
                        gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER'] },
                        role: {
                            type: 'string',
                            enum: ['SUPERADMIN', 'ADMIN', 'EXAMINER', 'EXAMINEE']
                        }
                    }
                },
                SigninRequest: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: { type: 'string', example: 'janedoe' },
                        password: { type: 'string', format: 'password', example: 'Secret123!' }
                    }
                }
            },
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'refreshToken'
                }
            }
        }
    },
    apis: ['./src/routes/*.ts']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
