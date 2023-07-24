import React, { useState, useEffect } from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav, Col, Row } from "react-bootstrap";
import logo from "./find&seek.png";
import "./NavComponent.css"; // Import custom CSS file

function NavComponent({fetchFilteredAdventures}) {

	const [priceRating, setPriceRating] = useState("");
	const [intensityRating, setIntensityRating] = useState("");
	const [activities, setActivities] = useState([]);
	const [activityValue, setActivityValue] = useState("")
	// const searchQuery = document.getElementById("searchInput").value.trim();

	const handlePriceRating = (rating) => {
		setPriceRating(rating);
	};

	const handleIntensityRating = (rating) => {
		setIntensityRating(rating);
	};
	const fetchActivities = async () => {
		try {
			const response = await fetch("http://localhost:8000/activities");
			const data = await response.json();
			console.log(data)
			const fetchedActivities = data.map((activity) => activity.name);
			console.log(fetchedActivities)
			setActivities(fetchedActivities);
		} catch (error) {
			console.log("Error fetching activities:", error);
		}
	};

	useEffect(() => {
		fetchActivities();
	}, []);

	const handleSearchClick = () => {
		console.log(activityValue, intensityRating, priceRating)
    fetchFilteredAdventures(activityValue, intensityRating, priceRating);
 	};
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
									<input
										type="text"
										placeholder="Where are you going?"
									/>
								</Col>
								<Col md={3} className="activities-col text-center">
									<h3 style={{ fontSize: "1em" }}>Activities</h3>
									<div className="activities">
										<select
											value={activityValue}
											onChange={(e) => setActivityValue(e.target.value)}
										>
											<option value="">Activity</option>
											{activities.map((activity, index) => (
												<option key={index + 1} value={index + 1}>
												{activity}
												</option>
											))}
										</select>
									</div>
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
								<button onClick={handleSearchClick}>Search</button>
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
