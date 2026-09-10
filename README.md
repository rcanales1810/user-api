# User API

RESTful API for user management built with Node.js, Express, and PostgreSQL.

## Overview

User API is a RESTful API for managing user accounts. It provides endpoints for user registration, authentication, information retrieval, updates, and user deactivation.

The API uses JWT-based authentication, password hashing with bcrypt, input validation, role-based authorization, centralized error handling, and OpenAPI documentation.

## Features

- User registration
- User authentication with JWT
- Password hashing with bcrypt
- User information retrieval
- Full and partial user updates
- Soft deletion through user deactivation
- Input validation
- Role-based auhorization
- Centralized error handling
- CORS configuration
- Security headers with Helmet
- Rate limiting
- OpenAPI documentation

## Technologies

- Node.js
- Express
- PostgreSQL
- bcrypt
- JSON Web Token (JWT)
- Helmet
- CORS
- express-rate-limit
- Swagger UI / OpenAPI
- Nodemon

## Project Structure

```text
src/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── docs/
│   └── openapi.js
├── middlewares/
│   ├── authorizeRole.js
│   ├── authToken.js
│   ├── errorHandler.js
│   ├── validatePatchUserBody.js
│   ├── validateUserBody.js
│   └── validateUserId.js
├── routes/
│   ├── auth.route.js
│   └── users.route.js
├── services/
│   ├── auth.service.js
│   └── user.service.js
├── utils/
│   └── validators.js
├── app.js
└── server.js
```

### Directory responsibilities
- config/ - Database connection and configuration
- controllers/ - Handle HTTP requests and responses
- docs/ - OpenAPI documentation
- middlewares/ - Authentication, authorization, input validation, and error handling
- routes/ - Define API endpoints and connect them to controllers and middleware
- services/ - Contain business logic and database operations
- utils/ - Reusable validation utilities
- app.js - Configure the Express application and middleware
- server.js - Start the HTTP server 

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL

### Installation

Clone the repository:
```bash
 git clone <https://github.com/rcanales1810/user-api.git>
```

Navigate to project directory:
```bash
 cd user-api
```

Install the dependencies:
```bash
 npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to the repository.

### Running the application

Start the development server with: 

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

A confirmation message is displayed in the console.
For production mode: 

```bash
npm start
```

## Authentication

The API uses JSON Web Tokens (JWT) for user authentication.

Users must authenticate through the login endpoint to obtain a JWT. The token must then be included in the `Authorization` header when accessing protected endpoints.

### Protected Endpoints

The following endpoints require authentication:

- `GET /users/{id}`
- `DELETE /users/{id}`

Use the following format in the request header:

```text
Authorization: Bearer <your_token>
```

### Authentication errors

- 401 Unauthorized - The token is missing, malformed, invalid or expired.
- 403 Forbidden - The authenticated user does not have permission to perform the requested action.

## API endpoints

### User management


| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/users` | Get all active users | No |
| POST | `/users` | Register a new user | No |
| GET | `/users/{id}` | Get a user by ID | Yes |
| PUT | `/users/{id}` | Replace a user's information | No |
| PATCH | `/users/{id}` | Partially update a user's information | No |
| DELETE | `/users/{id}` | Deactivate a user | Yes |


### Authentication

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/login` | Authenticate a user and obtain a JWT | No |

### Query Parameters

The `GET /users` endpoint supports the following query parameter:

- `includeInactive` - If set to `true`, inactive users are included in the response.

Example:

```text
GET /users?includeInactive=true
```

## HTTP Status Codes

The API uses standard HTTP status codes to indicate the result of each request.

| Status Code | Meaning |
|-------------|---------|
| 200 | Request successful |
| 201 | Resource successfully created |
| 400 | Invalid request or input data |
| 401 | Authentication required or invalid credentials |
| 403 | Authenticated user does not have permission |
| 404 | Resource not found |
| 409 | Conflict, such as a duplicate email |
| 500 | Internal server error |


## API Documentation

Interactive API documentation is available through Swagger UI.

Once the application is running, access the documentation at:

```text
http://localhost:3000/api-docs
```

The Swagger documentation describes the available endpoints, request parameters, request bodies, responses, authentication requirements, and HTTP status codes.

## Technical Decisions

### Layered architecture
The project separates responsibilities into routes, controllers, services, and middleware.
- Routes define the API endpoints.
- Controllers handle HTTP requests and responses.
- Services contain business logic and database operations.
- Middleware handles cross-cutting concerns such as authentication, validation, and error handling.

### Password security
Passwords are never stored as plaintext. They are hashed using bcrypt before being stored in the database.

### Authentication
JWT is used to authenticate users and protect endpoints that require authorization.

### Soft deletion
Users are not physically deleted from the database. The `is_active` field is set to `false`, allowing the system to preserve the user record.

### Error handling
Errors are handled through centralized error middleware, keeping controllers focused on request handling.

## Future improvements
Possible future improvements include:

- Automated testing with Jest and Supertest
- Docker-based development environment
- CI/CD pipeline
- Refresh token support
- More granular role and permission management