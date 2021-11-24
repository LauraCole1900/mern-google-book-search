import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { UserAPI } from "../utils/api";
import Auth from "../utils/auth";
import BookCard from "../components/bookCard";

const SavedPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const userDataLength = Object.keys(userData).length;

  const returnToHome = () => {
    navigate("/");
  }

  useEffect(() => {
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
        console.log({ user })
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

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
            <Row>
              <Col sm={12}>
                <BookCard thisBook={book} />
              </Col>
            </Row>
          ))}
      </Container>
    </>
  )
}

export default SavedPage;