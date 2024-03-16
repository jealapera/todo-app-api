const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded; // Attach decoded user information to the request object
    next();
  });
}

module.exports = { authenticateToken };
