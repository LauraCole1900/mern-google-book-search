import axios from "axios";

const GoogleAPI = {

  // GET books
  getAllBooks: function (query) {
    console.log("from API getAllBooks", query);
    return axios.get("/api/google", { params: { query: `title:${query}` } })
  }
}

export default GoogleAPI;