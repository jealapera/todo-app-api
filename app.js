const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routes");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Database setup
require("./db");

// Routes
routes(app);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
