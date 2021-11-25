import axios from "axios";

const UserAPI = {

  // POST new user to database
  createUser: function (formData) {
    return axios.post("/api/user/post", formData);
  },

  // POST user login
  loginUser: function (formData) {
    return axios.post("/api/user/login", formData);
  },


  // GET user by token
  getMe: function (token) {
    return axios.get("/api/user/me", {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },


  // UPDATE user's books
  saveBook: function (book, token) {
    return axios.put("/api/user/book", book, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    });
  },


  // DELETE user's book
  deleteBook: function (bookId, token) {
    return axios.delete(`/api/user/book/${bookId}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  }
  
};

export default UserAPI;