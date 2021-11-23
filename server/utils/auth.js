require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "1h";

module.exports = {

  authMiddleware: function (req, res, next) {
    // Token can be sent via req.query or req.headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
      console.log("authMiddleware", token)
    }

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    // Verify token and pull user data from it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "Invalid token" });
    }

    // send to next endpoint
    next();
  },

  signToken: function ({ email, userName, _id }) {
    const payload = { email, userName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};