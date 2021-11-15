const path = require("path");
const router = require("express").Router();
const apiBook = require("./bookRoutes");
const apiGoogle = require("./googleRoutes");
const apiUser = require("./userRoutes");

// API Routes
router.use("/api/book", apiBook);
router.use("/api/google", apiGoogle);
router.use("/api/user", apiUser);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;