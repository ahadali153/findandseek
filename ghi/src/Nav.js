import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav, Col, Row } from "react-bootstrap";
import logo from "./find&seek.png";
import "./NavComponent.css"; // Import custom CSS file

function NavComponent() {
	const handleLogout = () => {
		// Perform the delete request when the button is clicked
		fetch("http://localhost:8000/token", {
			method: "DELETE",
		})
			.then((response) => {
				// Handle the response from the server (e.g., redirect to login page)
				if (response.ok) {
					// Perform any necessary actions, e.g., redirect to login page
					window.location.href = "/"; // Replace "/login" with your login page URL
				} else {
					console.log("Failed to logout.");
				}
			})
			.catch((error) => {
				console.error("Error occurred during logout:", error);
			});
	};

	const [priceRating, setPriceRating] = useState(0);
	const [intensityRating, setIntensityRating] = useState(0);
	const handlePriceRating = (rating) => {
		setPriceRating(rating);
	};

	const handleIntensityRating = (rating) => {
		setIntensityRating(rating);
	};

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand as={NavLink} to="/" className="me-auto">
				<img className="logo" src={logo} alt="Logo" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarSupportedContent" />
			<Navbar.Collapse id="navbarSupportedContent">
				<Container>
					<Row className="unit1">
						<Col md={12}>
							<Row>
								{/* Add custom classes for columns */}
								<Col md={3} className="location-col text-center">
									<h3 style={{ fontSize: "1em" }}>Location</h3>
									<input type="text" placeholder="Where are you going?" />
								</Col>
								<Col md={3} className="activities-col text-center">
									<h3 style={{ fontSize: "1em" }}>Activities</h3>
									<input type="text" placeholder="What are you doing?" />
								</Col>
								<Col md={3} className="intensity-col text-center">
									<h3 style={{ fontSize: "1em" }}>Intensity</h3>
									<div className="intensity-ratings">
										{[1, 2, 3, 4, 5].map((n) => (
											<span
												key={n}
												className={`intensity ${
													n <= intensityRating ? "active" : ""
												}`}
												onClick={() => handleIntensityRating(n)}
											>
												{n}
											</span>
										))}
									</div>
								</Col>
								<Col md={3} className="price-col text-center">
									<h3 style={{ fontSize: "1em" }}>Price</h3>
									<div className="dollar-signs">
										{[1, 2, 3, 4, 5].map((n) => (
											<span
												key={n}
												className={`dollar ${n <= priceRating ? "active" : ""}`}
												onClick={() => handlePriceRating(n)}
											>
												$
											</span>
										))}
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
				<Nav className="ms-auto">
					<NavDropdown title="Account" id="dropdownMenuButton1">
						<NavDropdown.Item as={NavLink} to="/account">
							Account
						</NavDropdown.Item>
						<NavDropdown.Item as={NavLink} to="/login">
							Log in
						</NavDropdown.Item>
						<NavDropdown.Item as={NavLink} to="/logout">
							Signup
						</NavDropdown.Item>
						<button className="dropdown-item" onClick={handleLogout}>
							Logout
						</button>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavComponent;
