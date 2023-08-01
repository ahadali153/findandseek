import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Col,
  Row,
  Modal,
} from "react-bootstrap";
import logo from "./find&seek.png";
import "./NavComponent.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CreateAdventure from "./adventures/AdventureForm";

function NavComponent() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCreateAdventureModal, setShowCreateAdventureModal] =
    useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleShowSignupModal = () => {
    setShowSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleShowCreateAdventureModal = () => {
    setShowCreateAdventureModal(true);
  };

  const handleCloseCreateAdventureModal = () => {
    setShowCreateAdventureModal(false);
  };

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_HOST}/activities`);
      const data = await response.json();
      const fetchedActivities = data.map((activity) => activity.name);
      setActivities(fetchedActivities);
    } catch (error) {
      console.log("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    handleCloseLoginModal();
    localStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    fetch(`${REACT_APP_API_HOST}/token`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
          setLoggedIn(false);
          localStorage.removeItem("loggedIn");
        } else {
          console.log("Failed to logout.");
        }
      })
      .catch((error) => {
        console.error("Error occurred during logout:", error);
      });
  };

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("loggedIn");
    if (storedLoggedInStatus === "true") {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="me-auto">
            <img className="logo" src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto">
              {loggedIn ? (
                <>
                  <NavDropdown title="Account" id="dropdownMenuButton1">
                    <NavDropdown.Item as={NavLink} to="/account">
                      Account
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleShowCreateAdventureModal}>
                      Create an Adventure
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleShowLoginModal}>Login</Nav.Link>
                  <Nav.Link onClick={handleShowSignupModal}>Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal} centered>
        <Modal.Body>
          <LoginForm
            handleLogin={handleLogin}
            handleCloseLoginModal={handleCloseLoginModal}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showSignupModal} onHide={handleCloseSignupModal} centered>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal>
      <Modal
        show={showCreateAdventureModal}
        onHide={handleCloseCreateAdventureModal}
        centered
      >
        <Modal.Body>
          <CreateAdventure />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavComponent;
