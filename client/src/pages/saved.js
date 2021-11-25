import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { UserAPI } from "../utils/api";
import Auth from "../utils/auth";
import BookCard from "../components/bookCard";

const SavedPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [renderTrigger, setRenderTrigger] = useState(false);
  let savedBooks = [];

  const returnToHome = () => {
    navigate("/");
  }

  const getUserData = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        returnToHome();
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
    return savedBooks = user?.myBooks.map(book => book.bookId)
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
            <h1><span className="gBlue">M</span><span className="gRed">y</span> <span className="gBlue">S</span><span className="gRed">a</span><span className="gYellow">v</span><span className="gBlue">e</span><span className="gGreen">d</span> <span className="gBlue">B</span><span className="gRed">o</span><span className="gYellow">o</span><span className="gGreen">k</span><span className="gRed">s</span></h1>
          </Col>
        </Row>
        {userData.myBooks &&
          userData.myBooks.map((book) => (
            <Row key={book.bookId}>
              <Col sm={12}>
                <BookCard thisBook={book} savedBooks={savedBooks} renderTrigger={renderTrigger} setRenderTrigger={setRenderTrigger} />
              </Col>
            </Row>
          ))}
      </Container>
    </>
  )
}

export default SavedPage;