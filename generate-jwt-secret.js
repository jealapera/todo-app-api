const fs = require("fs");
const crypto = require("crypto");

// Generate a random JWT secret
const jwtSecret = crypto.randomBytes(32).toString("hex");

// Write the JWT secret to the .env file
fs.writeFileSync(".env", `JWT_SECRET=${jwtSecret}`);

console.log("JWT secret generated and saved to .env file.");
