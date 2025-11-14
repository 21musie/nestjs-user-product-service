# Product Service API

NestJS inventory management system with PostgreSQL.

## Quick Start

```bash
docker-compose up -d
```

## API Endpoints

- `GET /` - Health check
- `POST /users` - Create user
- `POST /products` - Create product
- `PUT /products/adjust` - Adjust quantity
- `GET /status/:productId` - Product status
- `GET /transactions` - List transactions

## Database Connection

**pgAdmin4:**
- Host: `localhost`
- Port: `5432`
- Database: `product_service`
- Username: `postgres`
- Password: `admin` update the password based on your docker-compose.yml file



## Tech Stack

- NestJS (TypeScript)
- PostgreSQL 17
- TypeORM
- Docker
