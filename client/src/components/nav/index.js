import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { UserAPI } from "../../utils/api";
import Auth from '../../utils/auth';
import "./style.css";

const Navigation = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [pageReady, setPageReady] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     UserAPI.getUserByEmail(user.email)
  //       .then((resp) => {
  //         console.log("from userInfo getUserByEmail", resp.data);
  //         const userArr = resp.data;
  //         setUserInfo(userArr);
  //         setPageReady(true);
  //       })
  //       .catch((err) => console.log(err))
  //   } else {
  //     setPageReady(true);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      {/* {pageReady === true && */}
      <Navbar expand="sm" className="navbar">
        <Navbar.Text className="hello">
          Welcome,&nbsp;
          {Auth.loggedIn()
            ? <Link to="/profile" className="navlink">
              {userInfo.given_name}!
            </Link>
            : <Link to="/login" className="navlink">
              Guest!
            </Link>
          }
        </Navbar.Text>
        <Nav className="navobj">
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" data-toggle="popover" title="Show Menu" /> */}
          <Navbar.Collapse id="basic-navbar-nav" className="navobject">
            {Auth.loggedIn() &&
              <Link to="/my_books" className="navlink">
                My Books
              </Link>}
            <Link to="/search" className="navlink">
              Search Books
            </Link>
            {Auth.loggedIn()
              ? <Link onClick={Auth.logout} className="navlink">
                Logout
              </Link>
              : <Link to="/login" className="navlink">
                Log In/Sign Up
              </Link>
            }
          </Navbar.Collapse>
        </Nav>
      </Navbar>
      {/* } */}
    </>
  )
}

export default Navigation;