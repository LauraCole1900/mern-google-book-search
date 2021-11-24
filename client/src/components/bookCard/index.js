import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Auth from "../../utils/auth";
import { UserAPI } from "../../utils/api";
import saveIcon from "../../icons/save-icon.png";
import deleteIcon from "../../icons/trash-can.png";
import "./style.css";

const BookCard = ({ thisBook }) => {
  // Breaks down the URL
  const urlArray = window.location.href.split("/")
  const urlWhere = urlArray[urlArray.length - 1]

  const handleSaveBook = async (book) => {
    console.log(book);
    const bookToSave = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
      link: book.volumeInfo.previewLink,
      bookId: book.id
    }
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await UserAPI.saveBook(JSON.stringify(bookToSave), token);
      if (response.status !== 200) {
        throw new Error("Book not saved")
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const handleSaveBook = async (bookId) => {
  //   // find the book in `searchedBooks` state by the matching id
  //   const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = await saveBook(bookToSave, token);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     // if book successfully saves to user's account, save book id to state
  //     setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleDeleteBook = () => {

  }

  return (
    <>
      <Card className="bookCard">
        <Card.Header className="bookTitle">
          <Row>
            <Col sm={3}>
              <Image src={thisBook.volumeInfo.imageLinks?.thumbnail || ''} />
            </Col>
            <Col sm={7}>
              <h1>{thisBook.volumeInfo.title}</h1>
              {thisBook?.volumeInfo?.authors &&
                <p>by {thisBook.volumeInfo.authors.join("; ")}</p>}
              <p>Click <a href={thisBook.volumeInfo.previewLink} target="_blank" rel="noreferrer">here</a> for more information</p>
            </Col>
            {/* {Auth.loggedIn() &&
              urlWhere !== "my_books" &&
              <Col sm={2} className="right">
                <Button
                  data-toggle="popover"
                  title="Save Book"
                  className="button iconButton"
                  data-btnname="saveBook"
                  onClick={saveBook}
                  type="button"
                ><Image fluid src={saveIcon} className="icon" alt="Save" /></Button>
              </Col>} */}
            {Auth.loggedIn() &&
              (urlWhere === "my_books"
                ? <Col sm={2} className="right">
                  <Button
                    data-toggle="popover"
                    title="Delete Book"
                    className="button iconButton"
                    data-btnname="deleteBook"
                    onClick={handleDeleteBook}
                    type="button"
                  ><Image fluid src={deleteIcon} className="icon" alt="Save" /></Button>
                </Col>
                : <Col sm={2} className="right">
                  <Button
                    data-toggle="popover"
                    title="Save Book"
                    className="button iconButton"
                    data-btnname="saveBook"
                    onClick={() => handleSaveBook(thisBook)}
                    type="button"
                  ><Image fluid src={saveIcon} className="icon" alt="Save" /></Button>
                </Col>)}
          </Row>
        </Card.Header>
        <Card.Body>
          <p>{thisBook.volumeInfo.description}</p>
        </Card.Body>
      </Card>
    </>
  )
};

export default BookCard;