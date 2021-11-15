const ObjectId = require("mongodb").ObjectId;
const db = require("../models");

module.exports = {
  // CREATE new saved book document
  create: function (req, res) {
    console.log("from bookController create", req.body);
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },


  // FIND ALL saved books
  findAll: function (req, res) {
    console.log("from bookController findAll");
    db.Book
      .find({})
      .sort({ title: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },

  // FIND ONE book by title & author
  findByTitleAndAuthor: function (req, res) {
    console.log("from bookController findByTitleAndAuthor", req.params);
    db.Book
      .findOne({ title: req.params.title, author: req.params.author })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },


  // DELETE book by ID
  deleteBook: function (req, res) {
    console.log("from bookController deleteBook", req.params.id);
    db.Book
      .deleteOne({ id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  }
}