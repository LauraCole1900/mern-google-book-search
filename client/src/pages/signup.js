import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { UserAPI } from "../utils/api";

const SignupPage = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handles click on "submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup submit", user);

    await UserAPI.createUser({ ...user })
      .then(res => {
        console.log("signup form res", res);
        if (!res.err) {
          navigate("/login");
        } else {
          console.log("signup form submit err", res.err);
        }
      })
  }

  return (
    <>
      <Container>
        <Row className="center">
          <Col sm={12}>
            <h1><span className="gBlue">S</span><span className="gRed">i</span><span className="gYellow">g</span><span className="gBlue">n</span> <span className="gGreen">U</span><span className="gRed">p</span></h1>
            <p className="smallText"><Link to="/login">Log in instead</Link></p>
          </Col>
        </Row>
        <Form className="loginForm">

          <Row>
            <Col sm={12}>
              <Card className="formCard">

                <Card.Body>
                  <Form.Group className="formGroup">
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                          type="input"
                          id="signupUsername"
                          name="userName"
                          placeholder="User McUserface"
                          value={user?.userName}
                          className="formInput"
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="formGroup">
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="input"
                          id="signupEmail"
                          name="email"
                          placeholder="you@email.com"
                          value={user?.email}
                          className="formInput"
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          type="password"
                          id="signupPassword"
                          name="password"
                          placeholder="password"
                          value={user?.password}
                          className="formInput"
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Row>
                    <Col sm={10}></Col>
                    <Col sm={2}>
                      <Button
                        data-toggle="popover"
                        title="Sign up"
                        className="button gButton"
                        data-btnname="login"
                        onClick={handleFormSubmit}
                        type="submit"
                      >Sign Up</Button>
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
}

export default SignupPage;