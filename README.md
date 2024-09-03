# URL Shortener

A simple URL shortener application with separate frontend and backend. This README provides instructions for setting up and running the project, including environment variables, database configuration, and seeding.

## Table of Contents

1. [Requirements](#requirements)
2. [Environment Variables](#environment-variables)
3. [Starting the Application](#starting-the-application)
   - [Frontend](#frontend)
   - [Backend](#backend)
4. [Database Setup](#database-setup)
   - [SQL File](#sql-file)
5. [Seeding the Database](#seeding-the-database)
6. [Contributing](#contributing)

## Requirements

- Node.js (v20.x or later)
- PostgreSQL (or your preferred SQL database due to prisma support)
- `npm`

## Environment Variables

Create a `.env` file in the root of backend directory. The file should contain the following variables:

### Backend (.env, .env.development, .env.production, .env.staging)

```env
# Backend
DATABASE_URL=postgres://user:password@localhost:5432/yourdatabase
JWT_SECRET=your_jwt_secret
PORT=5000
CLOUDINARY_CLOUD_NAME= your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_client_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

NOTE: change the scripts in package.json depending upon your os to set NODE environment.

### Frontend (.env)

```env
BASE_URL= "http://localhost:5000/api/v1"
```

## Starting the Application

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run migrations to set up the database schema:

   ```bash
   npx run migrate
   ```

4. Start the backend server:

   ```bash
   npm run start:dev
   ```

   The backend server will be running on `http://localhost:5000` by default.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend application will be running on `http://localhost:3000` by default.

## Database Setup

Ensure you have PostgreSQL or your preferred SQL database set up. Create a database for the URL shortener application.

1. **Create Database:**

   Connect to your database and create a new database:

   ```sql
   CREATE DATABASE url_shortner;
   ```

2. **Update `.env` File:**

   Update the `DATABASE_URL` variable in the `.env` file with your database credentials.

## Seeding the Database

A seed.zip file can be downloaded from [here](https://drive.google.com/file/d/1Zs1G9hhL5swBi0BWETTDXODjyGyp5kSo/view?usp=sharing). This file contains SQL statements to seed the database with initial data.

```
psql -U postgres -d url_shortner -f seed.sql
```

### Sample Users

The `seed.sql` file includes sample user data for initial setup:

- **Username:** muhammadsubhan5701@gmail.com
- **Password:** Subhan123
- **Role:** Admin

The passwords are stored in hashed form for security. Ensure your application uses appropriate hashing methods to match this data.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and ensure tests pass.
4. Submit a pull request with a description of your changes.

---
