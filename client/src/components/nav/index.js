import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { UserAPI } from "../../utils/api";
import Auth from '../../utils/auth';
import "./style.css";

const Navigation = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }
        const response = await UserAPI.getUser(token);

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const user = await response.json();
        setUserInfo(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserInfo();
  }, []);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      <Navbar expand="sm" className="navbar">
        <Navbar.Text className="hello">
          Welcome,&nbsp;
          {Auth.loggedIn()
            ? <Link to="/my_books" className="navlink">
              {userInfo.given_name}!
            </Link>
            : <Link to="/login" className="navlink">
              Guest!
            </Link>
          }
        </Navbar.Text>
        <Nav className="navobj">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" data-toggle="popover" title="Show Menu" />
          <Navbar.Collapse id="basic-navbar-nav" className="navobject">
            {Auth.loggedIn() &&
              <Link to="/my_books" className="navlink">
                My Books
              </Link>}
            <Link to="/" className="navlink">
              Search Books
            </Link>
            {Auth.loggedIn()
              ? <Link onClick={Auth.logout} className="navlink">
                Logout
              </Link>
              : <Link to="/login" className="navlink">
                Log In
              </Link>
            }
          </Navbar.Collapse>
        </Nav>
      </Navbar>
    </>
  )
}

export default Navigation;