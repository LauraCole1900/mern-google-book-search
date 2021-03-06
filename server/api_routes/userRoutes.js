const router = require("express").Router();
const userController = require("../controllers/userController.js");
const { authMiddleware } = require('../utils/auth');

// stem "/api/user"
router.route("/post")
  .post(userController.create);

router.route("/login")
  .post(userController.login);


router.route("/me")
  .get(authMiddleware, userController.getThisUser);


router.route("/book")
  .put(authMiddleware, userController.saveBook);


router.route("/book/:id")
  .delete(authMiddleware, userController.deleteBook);

  
module.exports = router;