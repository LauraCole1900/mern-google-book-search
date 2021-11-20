import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import "./style.css";

const BookCard = ({ thisBook }) => {

  return (
    <>
      <Card className="bookCard">
        <Card.Header className="book-title">
          <Row>
            <Col sm={3}>
              <Image src={thisBook.volumeInfo.imageLinks?.thumbnail || ''} />
            </Col>
            <Col sm={9}>
              <h1>{thisBook.volumeInfo.title}</h1>
              <p>by {thisBook.volumeInfo.authors.join("; ")}</p>
            </Col>
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