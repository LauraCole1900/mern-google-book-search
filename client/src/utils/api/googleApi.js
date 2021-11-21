const GoogleAPI = {

  // GET books
  searchBooks: function (book) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=25`);
  }
}

export default GoogleAPI;