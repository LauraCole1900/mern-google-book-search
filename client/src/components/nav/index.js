import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import { UserAPI } from "../../utils/api";
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
          <Navbar.Brand className="logo ml-3">
            <div>
              {/* <Image fluid src="/images/bristlecone-light.png" alt="BCMS logo" className="pineTree mylogo" /> */}
              <Link to="/conferences" className={navigate.pathname === "/conferences" ? "mylogo active" : "mylogo"}>
                Search Google Books!
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Text className="hello">
            Welcome,
          {/* {isAuthenticated
              ? <Link to="/profile" className={navigate.pathname === "/profile" ? "navlink active" : "navlink"}>
                {userInfo.given_name}!
                </Link>
              : <Link to={window.location.origin} className="navlink guest" onClick={() => loginWithRedirect()}>
                Guest!
                </Link>
            } */}
          </Navbar.Text>
          <Nav className="navobj">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" data-toggle="popover" title="Show Menu" />
            <Navbar.Collapse id="basic-navbar-nav" className="navobject">
              {/* {isAuthenticated &&
                <Link to="/my_books" className={navigate.pathname === "/my_books" ? "navlink placelink active" : "navlink placelink"}>
                  My Books
                </Link>} */}
              <Link to="/search" className={navigate.pathname === "/search" ? "navlink placelink active" : "navlink placelink"}>
                Search Books
              </Link>
              {/* {isAuthenticated
                ? <Link to={window.location.origin} className="navlink auth" onClick={() => logout({ returnTo: window.location.origin })}>
                  Logout
                  </Link>
                : <Link to={window.location.origin} className="navlink auth" onClick={() => loginWithRedirect()}>
                  Log In
                  </Link>
              } */}
            </Navbar.Collapse>
          </Nav>
        </Navbar>
      {/* } */}
    </>
  )
}

export default Navigation;