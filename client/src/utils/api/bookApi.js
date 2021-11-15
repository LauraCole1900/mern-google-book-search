import axios from "axios";

const BookAPI = {

  // POST new book to database
  createBook: function(formData) {
    console.log("from API createBook", formData);
    return axios.post("/api/book/post", formData)
  },


  // GET all books
  getBooks: function() {
    console.log("from API getBooks");
    return axios.get("/api/book/")
  },

  // GET book by title & author
  getBookByTitleAndAuthor: function(title, author) {
    console.log("from API getBookByTitleAndAuthor");
    return axios.get(`/api/book/${title}/${author}`)
  },

  // GET book by book ID
  getBookById: function(bookId) {
    console.log("from API getBookById", bookId);
    return axios.get(`/api/book/${bookId}`)
  },


  // UPDATE book by book ID
  updateBookById: function(bookId, formData) {
    console.log("from API updateBookById");
    return axios.put(`/api/book/update/${bookId}`, formData)
  },


  // DELETE book by book ID
  deleteBookById: function(bookId) {
    console.log("from API deleteBookById");
    return axios.delete(`/api/book/delete/${bookId}`)
  }
}

export default BookAPI;