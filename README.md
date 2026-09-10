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
 git clone <repository-url>
```

Navigate to project directory:
```bash
 cd user-api
```

Install the dependencies:
```bash
 npm install
```