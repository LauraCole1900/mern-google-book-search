const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  authors: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  bookId: {
    type: String,
    required: true
  }
});

module.exports = bookSchema;