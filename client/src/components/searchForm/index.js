import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { GoogleAPI } from "../../utils/api";
import "./style.css";

const SearchForm = ({ book, setBook, searchedBook, setSearchedBook }) => {

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Submits book information
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // FETCH call to search the API
    await GoogleAPI.searchBooks(book.title)
      .then(res => {
        // If no errors, json the result, then filter
        if (!res.err) {
          res.json()
            .then(res => {
              const filteredBooks =
                res.items.filter(book =>
                  book.volumeInfo.title &&
                  book.volumeInfo.authors &&
                  book.volumeInfo.description &&
                  book.volumeInfo.previewLink &&
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                )
              console.log(filteredBooks);
              setSearchedBook(filteredBooks);
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <>
      <Container>
        <Form className="searchForm">

          <Row>
            <Col sm={12}>
              <Card className="formCard">
                <Card.Body className="cardBody">

                  <Form.Group>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Title: <span className="red">*</span></Form.Label><br />
                        <Form.Control
                          type="input"
                          id="formTitle"
                          name="title"
                          placeholder="War and Peace"
                          value={book?.title}
                          className="formInput"
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Row>
                    <Col sm={9}></Col>
                    <Col sm={3}>
                      <Button
                        data-toggle="popover"
                        title="Search"
                        className="button gButton"
                        data-btnname="searchBook"
                        onClick={handleFormSubmit}
                        type="submit"
                      >Search Books</Button>
                    </Col>
                  </Row>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Form>

      </Container>
    </>
  )

};

export default SearchForm;