# Brighte Eats

## Description

edit later

## Features

- **CRUD Operations:** Create, Read, ~~Update~~, ~~Delete~~ operations for managing entities.
- **Type Safety:** Fully typed GraphQL schema using TypeScript.
- **Database:** MySQL database integration using Sequelize ORM.

## Technologies

- **GraphQL:** Query language for your API.
- **TypeScript:** JavaScript with type annotations for better development experience.
- **Apollo Server:** GraphQL server.
- **Sequelize:** ORM to manage MySQL database.
- **MySQL:** Database.
- **React:** JS library for frontend components.
- **Docker:** Tool for building, testing, and deploying applications easily.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker

If not using Docker, ensure you have met the following requirements:

- Node.js (v20 or higher)
- MySQL
- npm

## Installation (Using Docker)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shencabigting/brighte-eats.git
   cd brighte-eats

   ```

2. **Create a .env file in the project's root directory**

   ```bash
    DATABASE_NAME="<YOUR_DATABASE_NAME>"
    DATABASE_USER="<YOUR_DATABASE_USERNAME>"
    DATABASE_PASSWORD="<YOUR_DATABASE_PASSWORD>"
    DATABASE_HOST="<YOUR_DATABASE_HOST"
    DATABASE_ROOT_PASSWORD="<YOUR_DATABASE_ROOT_PASSWORD>"
   ```

3. **Build and run application using Docker**

   ```bash
   make up

   ```

4. **To shutdown the application**

   ```bash
   make down

   ```

5. **To run unit tests**

   ```bash
   make test
   ```

## Installation (Not Using Docker)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shencabigting/brighte-eats.git
   cd brighte-eats

   ```

2. **Create a .env file in the project's root directory**

   ```bash
   DATABASE_NAME="<YOUR_DATABASE_NAME>"
   DATABASE_USER="<YOUR_DATABASE_USERNAME>"
   DATABASE_PASSWORD="<YOUR_DATABASE_PASSWORD>"
   DATABASE_HOST="<YOUR_DATABASE_HOST"
   DATABASE_ROOT_PASSWORD="<YOUR_DATABASE_ROOT_PASSWORD>"
   ```

3. **Make sure you have a running MySQL instance**
   \Use init.sql to create the database tables

4. **Install all dependencies and run the GraphQL server**
   \From the project's root directory:

   ```bash
   cd server
   npm install
   npm start
   ```

5. **Install all dependencies and run the React client**
   \From the project's root directory:

   ```bash
   cd client
   npm install
   npm start
   ```
