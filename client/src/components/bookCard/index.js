import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Auth from '../../utils/auth';
import "./style.css";

const BookCard = ({ thisBook }) => {

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
            {Auth.loggedIn() &&
              <Col sm={2}>
                <Button
                  data-toggle="popover"
                  title="Save Book"
                  className="button gButton"
                  data-btnname="saveBook"
                  // onClick={saveBook}
                  type="button"
                >Save Book</Button>
              </Col>}
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