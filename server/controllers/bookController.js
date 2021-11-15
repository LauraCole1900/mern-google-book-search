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
      .find(req.query)
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

  // FIND ONE book by ID
  findById: function(req,res) {
    console.log("from bookController findById", req.params);
    db.Book
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(500).json(err))
  },


  // UPDATE ONE book by ID
  updateBook: function(req,res) {
    console.log("from bookController updateBook", req.params);
    db.Book
      .findOneAndUpdate({ id: req.params.id }, req.body)
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