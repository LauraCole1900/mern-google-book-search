import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../components/bookCard";
import SearchForm from "../components/searchForm";

const SearchPage = () => {
  const [book, setBook] = useState({
    title: ""
  });
  const [searchedBook, setSearchedBook] = useState();

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
        {searchedBook &&
          searchedBook.map((thisBook) => (
            <Row key={thisBook.id} >
              <Col sm={12}>
                <BookCard thisBook={thisBook} />
              </Col>
            </Row>
          ))}
      </Container>
    </>
  )
}

export default SearchPage;