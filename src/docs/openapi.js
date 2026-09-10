const { application } = require("express");

const openApiSpecification = {
    openapi: "3.0.0",

    info: {
        title: "User API",
        version: "1.0.0",
        description: "REST API for user management"
    },

    servers: [
        {
            url: "http://localhost:3000"
        }
    ],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },

        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 1
                    },
                    name: {
                        type: "string",
                        example: "Ricardo"
                    },
                    email: {
                        type: "string",
                        example: "ricardo@example.com"
                    },
                    is_active: {
                        type: "boolean",
                        example: true
                    },
                    role: {
                        type: "string",
                        example: "user"
                    }
                }
            }
        }
    },

    paths: {
        "/users": {
            get: {
                summary: "Return users",
                description: "Returns the list of users. By default, it returns only active users.",
                parameters: [
                    {
                        name: "includeInactive",
                        in: "query",
                        required: "false",
                        schema: {
                            type: "boolean",
                            default: false
                        },
                        description: "If true, response includes inactive users"
                    }
                ],
                responses: {
                    200: {
                        description: "Lista de usuarios obtenida correctamente",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error interno del servidor"
                    }
                }
            },
            post: {
                summary: "Register a new user",
                description: "Registers a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "name", "password"],
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "post@mail.com"
                                    },
                                    name: {
                                        type: "string",
                                        example: "Post Example"
                                    },
                                    password: {
                                        type: "string",
                                        example: "postPassword"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Registration successful",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Usuario creado correctamente"
                                        },
                                        user: {
                                            $ref: "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid input data: name is required or email format is invalid"
                    },
                    409: {
                        description: "The provided email is already registered"
                    },
                    500: {
                        description: "Internal server error"
                    }
                }
            }
        },

        "/users/{id}": {
            get: {
                summary: "Obtener un usuario específico",
                description: "Obtiene el objeto del usuario correspondiente al id ingresado",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            example: 4
                        }
                    }
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Retorna el usuario correspondiente al ID",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    401: {
                        description: "Token not provided, token format is invalid or expired"
                    },
                    400: {
                        description: "ID inválido"
                    },
                    404: {
                        description: "Usuario no encontrado"
                    },
                    500: {
                        description: "Error interno del servidor"
                    }
                }
            },
            put: {
                summary: "Replace a user's information",
                description: "Replace a user's information with the provided values",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            example: 4
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "name"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Test Name"
                                    },
                                    email: {
                                        type: "string",
                                        example: "test@mail.com"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "User successfully updated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        updatedUser: {
                                            $ref: "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid input data: ID is invalid, name is missing, or email has an invalid format"
                    },
                    404: {
                        description: "User not found"
                    },
                    409: {
                        description: "The provided email is already registered"
                    },
                    500: {
                        description: "Internal server error"
                    }
                }
            },
            delete: {
                summary: "Deactivate a user",
                description: "Changes the user's status to inactive",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            example: 4
                        }
                    }
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "User was successfully deactivated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        deletedUser: {
                                            $ref: "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Token not provided, token format is invalid, or token has expired"
                    },
                    403: {
                        description: "User does not have permission to perform this action"
                    },
                    400: {
                        description: "ID is invalid"
                    },
                    404: {
                        description: "User not found"
                    },
                    500: {
                        description: "Internal server error"
                    }
                }
            },
            patch: {
                summary: "Replace one field of the user",
                description: "Replace one field of the user leaving the others as they are",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            example: 4
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Test Name"
                                    },
                                    email: {
                                        type: "string",
                                        example: "test@mail.com"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "The user has been successfully updated with the provided fields.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        patchedUser: {
                                            $ref: "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Invalid ID, empty request body, or invalid email format."
                    },
                    404: {
                        description: "User not found"
                    },
                    409: {
                        description: "Email has already been registered"
                    },
                    500: {
                        description: "Internal server error"
                    }
                }
            }
        },

        "/auth/login": {
            post: {
                summary: "Log in",
                description: "Authenticates a user and returns a JSON Web Token (JWT)",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "ricardo@mail.com"
                                    },
                                    password: {
                                        type: "string",
                                        example: "testPassword"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login successful",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            $ref: "#/components/schemas/User"
                                        },
                                        token: {
                                            type: "string",
                                            example: "eyJhbGciOiJIUzI1NiJ9.fake-token-for-documentation"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "A required credential is missing"
                    },
                    401: {
                        description: "Invalid credentials"
                    },
                    500: {
                        description: "Internal server error"
                    }
                }
            }
        },


    }
}

module.exports = openApiSpecification;