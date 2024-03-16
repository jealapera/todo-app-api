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

3. **Create .env Files**:
  - Before running the app, make sure to create a .env file in the root directory of the project. Add the following environment variables:
    ```bash
    touch .env

  - Add the following environment variables:
    ```bash
    PORT=3000
    JWT_SECRET=

  - Run the ff. command on your terminal to generate a JWT_SECRET:
    ```bash
    node generate-jwt-secret.js

4. **Start the Server**:
    ```bash
    node app.js
