require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY
};
