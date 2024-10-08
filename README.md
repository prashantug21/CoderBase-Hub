# CoderBase Hub

## Project Overview

CoderBase Hub is a full-stack web application that allows users to track, analyze, and connect with coding profiles across various platforms such as LeetCode, Codeforces, CodeChef, and GeeksforGeeks. The project is mainly built with Next.js.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [Running the Project](#running-the-project)
  - [Development](#development)

## Features

- User Authentication (Signup, Login)
- JWT-based authentication
- Manage coding profiles for multiple platforms
- Dynamic data visualization (e.g., charts)

## Technologies Used
- Next.js
- Tailwind CSS
- PostgreSQL (for database)
- JWT for authentication
- Resend API (for sending OTPs)

## Installation

### Prerequisites
- PostgreSQL (for database)

1. Install Dependencies
```bash
npm install
```
2. Set up environment variables:
Create a .env file in the client directory with the following content:
```bash
DATABASE_URL=
EMAIL_API_KEY=
JWT_SECRET=
```

Create a Neon PostgreSQL database. Run migrations if you have any, or set up the schema manually.

## Running the Project
### Development
```bash
npm run dev
```
The webpage will be running at http://localhost:3000.
