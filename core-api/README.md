# AutoResolve Core API

The central REST API and backend service for the AutoResolve ticketing system. Built using NestJS, this service handles user authentication, ticket management, database interactions (TypeORM/PostgreSQL), and acts as an AMQP publisher for background tasks.

## Setup

```bash
npm install
npm run build
```

## Running the app

```bash
npm run start
npm run start:dev
```

## Environment Config
Ensure your `.env` file matches your Docker instances:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=autoresolve

RABBITMQ_URL=amqp://admin:password123@localhost:5672
JWT_SECRET=your_super_secret_jwt_key
```
