# Express Todo App

This is a simple Todo App built with Node.js and Express.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jealapera/todo-app-api.git
   cd todo-app-api

2. **Install Dependencies**:
  
   ```bash
   npm install

3. **Create .env File**:
  - Before running the app, be sure to make a file named .env in the main project folder and check what's inside the config.env file.
    ```bash
    touch .env

  - Run the ff. command on your terminal to generate a JWT_SECRET:
    ```bash
    node generate-jwt-secret.js

4. **Start the Server**:
    ```bash
    node app.js
