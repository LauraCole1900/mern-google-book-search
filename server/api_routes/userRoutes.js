const router = require("express").Router();
const userController = require("../controllers/userController.js");

// stem "/api/user"
router.route("/post")
  .post(userController.create);

router.route("/login")
  .post(userController.login);

router.route("/:email")
  .get(userController.findByEmail);


router.route("/update/:email")
  .put(userController.updateUser);


router.route("/delete/:id")
  .delete(userController.removeUser);

  
module.exports = router;