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

  const handleDeleteBook = () => {

  }

  return (
    <>
      <Card className="bookCard">
        <Card.Header className="bookTitle">
          <Row>
            <Col sm={3}>
              {urlWhere === "my_books"
                ? <Image src={thisBook.image || ""} />
                : <Image src={thisBook.volumeInfo.imageLinks?.thumbnail || ''} />}
            </Col>
            <Col sm={7}>
              {urlWhere === "my_books"
                ? <h1>{thisBook.title}</h1>
                : <h1>{thisBook.volumeInfo.title}</h1>}
              {urlWhere === "my_books"
                ? (thisBook.authors &&
                  <>
                    <p>by {thisBook.authors.join("; ")}</p>
                    <p>Click <a href={thisBook.link} target="_blank" rel="noreferrer">here</a> for more information</p>
                  </>)
                : (thisBook?.volumeInfo?.authors &&
                  <>
                    <p>by {thisBook.volumeInfo.authors.join("; ")}</p>
                    <p>Click <a href={thisBook.volumeInfo.previewLink} target="_blank" rel="noreferrer">here</a> for more information</p>
                  </>)}
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
          {urlWhere === "my_books"
            ? <p>{thisBook.description}</p>
            : <p>{thisBook.volumeInfo.description}</p>}
        </Card.Body>
      </Card>
    </>
  )
};

export default BookCard;