import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { BookAPI, GoogleAPI, UserAPI } from "../../utils/api";
// import { commValidate } from "../../utils/validation";
import "./style.css";

const SearchForm = ({ book, setBook, searchedBook, setSearchedBook }) => {
  const [errors, setErrors] = useState([]);

  // Grabs conference ID from URL
  // const urlArray = window.location.href.split("/")
  // const confId = urlArray[urlArray.length - 1]
  // const formType = urlArray[urlArray.length - 2];

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Handles button click & checks if submitted book is already in the db
  // Probably better to handle this on the back end
  // const handleButtonClick = (e) => {
  //   const bookCheck = props.committee.find(book => book.title === props.member.commEmail)
  //   console.log({ bookCheck })
  //   if (bookCheck === undefined) {
  //     handleFormSubmit(e)
  //   } else {
  //     handleFormUpdate(e);
  //   }
  // }

  // Submits information for new committee member
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Book submit", book)
    // const validationErrors = commValidate(props.member);
    // const noErrors = Object.keys(validationErrors).length === 0;
    // setErrors(validationErrors);
    // switch (noErrors) {
    //   case true:
    // FETCH call to search the API
    await GoogleAPI.searchBooks(book.title)
      .then(res => {
        // If no errors thrown, show Success modal
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
              // handleShowSuccess();
            })
        }
      })
      //   }
      // })
      .catch(err => {
        console.log(err)
        // setErrThrown(err.message);
        // handleShowErr();
      })
    //   break;
    // default:
    //   console.log({ errors });
    // }
  }

  const handleFormUpdate = (e) => {
    e.preventDefault();
    console.log("Book update", book);
    // const validationErrors = commValidate(props.member);
    // const noErrors = Object.keys(validationErrors).length === 0;
    // setErrors(validationErrors);
    // switch (noErrors) {
    //   case true:
    // PUT call to update member document
    BookAPI.updateBookById(book._id, { ...book })
      .then(res => {
        // If no errors thrown, show Success modal
        if (!res.err) {
          console.log(res);
          // handleShowSuccess();
        }
      })
      // If yes errors thrown, setState(err.message) and show Error modal
      .catch(err => {
        console.log(err)
        // setErrThrown(err.message);
        // handleShowErr();
      })
    //     break;
    //   default:
    //     console.log({ errors })
    // }
  }


  return (
    <>
      {/* {!isAuthenticated &&
        <Row>
          <h1 className="regRemind">Please <Link to={window.location.origin} className="login" onClick={() => loginWithRedirect()}>log in</Link> to add or edit committee members.</h1>
          <div className="authLogo">
            <Image
              fluid="true"
              className="loadLogo"
              src="/images/bristlecone-dark.png"
              alt="BCMS logo"
            />
          </div>
        </Row>} */}

      <Container>
        <Form className="searchForm">

          <Row>
            <Col sm={10}>
              <Card className="formCard">
                <Card.Body className="cardBody">

                  <Form.Group>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Title: <span className="red">*</span></Form.Label><br />
                        {/* {errors.commGivenName &&
                          <div className="error"><p>{errors.commGivenName}</p></div>} */}
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
                        type="button"
                      >Search Books</Button>
                    </Col>
                  </Row>

                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* {Object.keys(errors).length > 0 &&
            <Row>
              <Col sm={12}>
                <div className="error"><p>The nanobots have detected an error or omission in one or more required fields. Please review this form.</p></div>
              </Col>
            </Row>} */}

        </Form>

      </Container>
    </>
  )

};

export default SearchForm;