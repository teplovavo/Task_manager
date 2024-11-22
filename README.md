# Full-Stack Task Manager Application

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Description

This is a full-stack web application that serves as a Task Manager with additional features like user authentication and news integration. The application allows users to:

- Create, read, update, and delete tasks.
- Manage user accounts with authentication.
- View the latest news headlines.
- Interact with a dynamic dashboard displaying tasks, users, and news widgets.

---

## Features

- **User Authentication**: Sign up and log in with validation and error handling.
- **Task Management**: Add, edit, complete, and delete tasks with due dates.
- **Dashboard**: View widgets displaying task statistics, active users, and latest news.
- **News Integration**: Fetch and display the latest news headlines from an external API.
- **Responsive Design**: User-friendly interface that adapts to different screen sizes.
- **Stylish UI**: Modern design with a dark theme and purple accents.

---

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: Library for routing in React applications.
- **CSS**: Styling the application.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **bcrypt**: Library for hashing passwords.
- **Cors**: Middleware for handling Cross-Origin Resource Sharing.
- **Dotenv**: Module for loading environment variables.

---

## Prerequisites

- **Node.js**: Version 14 or higher.
- **NPM**: Comes with Node.js installation.
- **MongoDB Atlas Account**: For hosting the database (or a local MongoDB instance).
- **News API Key**: Sign up at [NewsAPI.org](https://newsapi.org/) to obtain an API key.

---

## Installation and Setup

### 1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### 2. Set Up the Backend
cd backend

npm install

Create a .env file in the backend directory and add your MongoDB connection string:

ATLAS_URI=your-mongodb-connection-string

Replace your-mongodb-connection-string with your actual MongoDB Atlas URI.

Start the backend server: node server.js

### 3. Set Up the Frontend
cd frontend

npm install

Create a .env file in the frontend directory and add your News API key:

REACT_APP_API_KEY=your-news-api-key

Replace your-news-api-key with the API key obtained from NewsAPI.org.

Start the frontend development server: npm start

## The frontend server will run on http://localhost:3001 (or http://localhost:3000 if the backend is on a different port).

### Usage
Open your web browser and navigate to http://localhost:3000 (or the port where your frontend is running).

Use the navigation menu to access different pages:

Home: View the dashboard with widgets.

Tasks: Manage your tasks.

News: Read the latest news headlines.

Login: Log in or create a new account.



### API Endpoints
- **Tasks**

GET /api/tasks: Retrieve all tasks.

POST /api/tasks: Create a new task.

PUT /api/tasks/:id: Update a task by ID.

DELETE /api/tasks/:id: Delete a task by ID.

PATCH /api/tasks/:id/completed: Update task completion status.

- **Users**

GET /api/users: Retrieve all users.

POST /api/users: Create a new user.

PUT /api/users/:id: Update a user by ID.

DELETE /api/users/:id: Delete a user by ID.

- **Authentication**

POST /api/auth/login: Authenticate a user.



### Contact
Veronika Teplova
https://www.linkedin.com/in/veronika-teplova/

Feel free to reach out for any questions or feedback!


