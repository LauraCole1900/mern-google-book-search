import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserAPI } from "../utils/api";
import Auth from "../utils/auth";
import BookCard from "../components/bookCard";
import SearchForm from "../components/searchForm";

const SearchPage = () => {
  const [book, setBook] = useState({
    title: ""
  });
  const [searchedBook, setSearchedBook] = useState();
  const [userData, setUserData] = useState({});
  const [savedBooks, setSavedBooks] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);

  const getUserData = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false
      }
      const response = await UserAPI.getMe(token);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      const user = response.data;
      setUserData(user);
      getBookIds(user);
    } catch (err) {
      console.error(err);
    }
  };

  const getBookIds = async (user) => {
    const savedBookIds = user?.myBooks.map(book => book.bookId)
    setSavedBooks(savedBookIds);
  }

  useEffect(() => {
    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderTrigger]);

  return (
    <>
      <Container>
        <Row className="center">
          <Col sm={12}>
            <h1><span className="gBlue">S</span><span className="gRed">e</span><span className="gYellow">a</span><span className="gBlue">r</span><span className="gGreen">c</span><span className="gRed">h</span> <span className="gBlue">G</span><span className="gRed">o</span><span className="gYellow">o</span><span className="gBlue">g</span><span className="gGreen">l</span><span className="gRed">e</span> <span className="gBlue">B</span><span className="gRed">o</span><span className="gYellow">o</span><span className="gGreen">k</span><span className="gRed">s</span></h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <SearchForm book={book} setBook={setBook} setSearchedBook={setSearchedBook} />
          </Col>
        </Row>
        {searchedBook?.map((thisBook) => (
          <Row key={thisBook.id} >
            <Col sm={12}>
              <BookCard thisBook={thisBook} savedBooks={savedBooks} renderTrigger={renderTrigger} setRenderTrigger={setRenderTrigger} />
            </Col>
          </Row>
        ))}
      </Container>
    </>
  )
}

export default SearchPage;