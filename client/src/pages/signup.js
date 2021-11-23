import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const SignupPage = () => {
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

    </>
  )
}

export default SignupPage;