const router = require("express").Router();
const bookController = require("../controllers/bookController.js");

// stem "/api/book"

router.route("/post")
  .post(bookController.create);


router.route("/")
  .get(bookController.findAll);

router.route("/:title/:author")
  .get(bookController.findByTitleAndAuthor);

router.route("/:id")
  .get(bookController.findById);


router.route("/update/:id")
  .put(bookController.updateBook);


router.route("/delete/:id")
  .delete(bookController.deleteBook);



module.exports = router;