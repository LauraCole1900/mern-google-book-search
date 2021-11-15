const axios = require("axios");
const db = require("../models");

module.exports = {
  // FIND ALL books defined in the query
  findAll: function (req, res) {
    console.log("from googleController findAll", req);
    const { query: params } = req;
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      .then(results =>
        // Make sure all results contain title, author, description, link, and image
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      .then(resp =>
        // Filters the results by whether it's already saved
        db.Book.find()
          .then(dbBooks =>
            resp.filter(resp =>
              dbBooks.every(dbBook => dbBook.googleId.toString() !== resp.id)
            )
          )
      )
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  }
};