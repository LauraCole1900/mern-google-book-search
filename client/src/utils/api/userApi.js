import axios from "axios";

const UserAPI = {

  // POST new user to database
  createUser: function (formData) {
    console.log("from API createUser", formData)
    return axios.post("/api/user/post", formData)
  },

  // POST user login
  loginUser: function (formData) {
    console.log("from API loginUser", formData)
    return axios.post("/api/user/login", formData)
  },


  // GET user by token
  getMe: function (token) {
    console.log("from API getMe", token);
    return axios.get("/api/user/me", {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },


  // UPDATE user's books
  saveBook: function (book, token) {
    console.log("from API saveBook", book, token);
    return axios.put("/api/user/book", book, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    });
  },


  // DELETE user's book
  deleteBook: function (id) {
    console.log("from API deleteBook", id);
    return axios.delete(`/api/user/delete/${id}`)
  }
};

export default UserAPI;