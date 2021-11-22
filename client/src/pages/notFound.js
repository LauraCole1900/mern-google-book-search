import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const NotFound = () => {

  return (
    <>
      <Container>
        <h1>404 - Page Not Found</h1>
        <h2>You've been exploring.</h2>
        <p>Unfortunately, there is no page here. We recommend you return to the <Link to="/">search page</Link>.</p>
      </Container>
    </>
  )
}

export default NotFound;