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

  // export const saveBook = (bookData, token) => {
  //   return fetch('/api/users', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(bookData),
  //   });
  // };


  // DELETE user by ID
  deleteUser: function (id) {
    console.log("from API deleteUser", id);
    return axios.delete(`/api/user/delete/${id}`)
  }
};

export default UserAPI;