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


router.route("/update/:email")
  .put(userController.updateUser);


router.route("/delete/:id")
  .delete(userController.removeUser);

  
module.exports = router;