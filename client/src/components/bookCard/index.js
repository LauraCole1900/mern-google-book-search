import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Auth from "../../utils/auth";
import saveIcon from "../../icons/save-icon.png";
import deleteIcon from "../../icons/trash-can.png";
import "./style.css";

const BookCard = ({ thisBook }) => {
  // Breaks down the URL
  const urlArray = window.location.href.split("/")
  const urlWhere = urlArray[urlArray.length - 1]

  const saveBook = () => {

  }

  const deleteBook = () => {

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
                    onClick={deleteBook}
                    type="button"
                  ><Image fluid src={deleteIcon} className="icon" alt="Save" /></Button>
                </Col>
                : <Col sm={2} className="right">
                  <Button
                    data-toggle="popover"
                    title="Save Book"
                    className="button iconButton"
                    data-btnname="saveBook"
                    onClick={saveBook}
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