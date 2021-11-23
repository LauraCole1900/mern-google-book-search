import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handles click on "submit" button
  const handleFormSubmit = () => {

  }

  return (
    <>
      <Container>
        <Row className="center">
          <Col sm={12}>
            <h1><span className="gBlue">L</span><span className="gRed">o</span><span className="gYellow">g</span><span className="gGreen">i</span><span className="gRed">n</span></h1>
            <p className="smallText"><Link to="/signup">Sign up instead</Link></p>
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
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="input"
                          id="loginEmail"
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
                          id="loginPassword"
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
                        title="Login"
                        className="button gButton"
                        data-btnname="login"
                        onClick={handleFormSubmit}
                        type="submit"
                      >Log in</Button>
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

export default LoginPage;