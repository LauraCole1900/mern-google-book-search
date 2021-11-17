require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "1h";

module.exports = {
  signToken: function ({ email, userName, _id }) {
    const payload = { email, userName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};