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
import searchIcon from "./searchIcon.png";
import "./NavComponent.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CreateAdventure from "./adventures/AdventureForm";

function NavComponent({ fetchFilteredAdventures }) {
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

	const [priceRating, setPriceRating] = useState("");
	const [intensityRating, setIntensityRating] = useState("");
	const [activities, setActivities] = useState([]);
	const [activityValue, setActivityValue] = useState("");

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
			const fetchedActivities = data.map((activity) => activity.name);
			setActivities(fetchedActivities);
		} catch (error) {
			console.log("Error fetching activities:", error);
		}
	};

	useEffect(() => {
		fetchActivities();
	}, []);

	const handleSearchClick = () => {
		fetchFilteredAdventures(activityValue, intensityRating, priceRating);
	};

	const handleLogin = () => {
		setLoggedIn(true);
		handleCloseLoginModal();
		localStorage.setItem("loggedIn", "true");
	};

	const handleSignup = () => {
		setLoggedIn(true);
		handleCloseSignupModal();
		localStorage.setItem("loggedIn", "true");
	};

	const handleLogout = () => {
		fetch("http://localhost:8000/token", {
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
					<Row className="align-items-center w-100">
						<Col md={3} className="location-col text-center right">
							<h3 style={{ fontSize: "1em" }}>Location</h3>
							<input type="text" placeholder="Where are you going?" />
						</Col>
						<Col md={2} className="activities-col text-center">
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
						<Col md={2} className="intensity-col text-center">
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
						<Col md={2} className="price-col text-center">
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
						<Col md={2} className="search-col text-center ml-auto">
							<button className="search-button" onClick={handleSearchClick}>
								<img src={searchIcon} alt="Search" />
							</button>
						</Col>
					</Row>
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
					<LoginForm handleLogin={handleLogin} />
				</Modal.Body>
			</Modal>
			<Modal show={showSignupModal} onHide={handleCloseSignupModal} centered>
				<Modal.Body>
					<SignupForm handleSignup={handleSignup} />
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
