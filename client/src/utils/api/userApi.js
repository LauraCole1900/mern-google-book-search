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


  // GET user by email
  findUserByEmail: function (email) {
    console.log("from API findUserByEmail", email);
    return axios.get(`/api/user/${email}`)
  },


  // UPDATE user by email
  updateUser: function (email, formData) {
    console.log("from API updateUser", email, formData);
    return axios.put(`/api/user/update/${email}`, formData)
  },


  // DELETE user by ID
  deleteUser: function (id) {
    console.log("from API deleteUser", id);
    return axios.delete(`/api/user/delete/${id}`)
  }
};

export default UserAPI;