import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadBioPic from "./AccountInfoUpload";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getRatingIcon, getPriceIcon, getIntensityIcon } from "./GoogleMap";
import NavComponent from "./DefaultNav";

const UserAccountPage = () => {
	const [userData, setUserData] = useState(null);
	const [userAdventures, setUserAdventures] = useState([]);
	const [activityMap, setActivityMap] = useState({});

	const fetchUserData = async () => {
		try {
			const response = await axios.get("http://localhost:8000/userinfo", {
				withCredentials: true,
			});
			setUserData(response.data);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	const fetchUserAdventures = async () => {
		try {
			const response = await axios.get("http://localhost:8000/adventures", {
				withCredentials: true,
			});
			// Filter the adventures based on userData.id
			console.log(response);
			const filteredAdventures = response.data.filter(
				(item) => item.account_id == userData.id
			);
			setUserAdventures(filteredAdventures);
		} catch (error) {
			console.error("Error fetching adventures:", error);
		}
	};

	const fetchAllActivities = async () => {
		try {
			const response = await fetch("http://localhost:8000/activities");
			const data = await response.json();
			return data;
		} catch (error) {
			console.log("Error fetching activities:", error);
			return [];
		}
	};

	// Helper function to fetch activity name based on activity ID
	const getActivityName = (activityId) => {
		return activityMap[activityId] || "Unknown Activity";
	};

	useEffect(() => {
		// Fetch all activities and map them to their IDs
		fetchAllActivities().then((activities) => {
			const mappedActivities = activities.reduce((acc, activity) => {
				acc[activity.id] = activity.name;
				return acc;
			}, {});
			setActivityMap(mappedActivities);
		});
	}, []);

	useEffect(() => {
		// Fetch user data and user adventures concurrently
		Promise.all([fetchUserData()]);
	}, []);

	useEffect(() => {
		if (userData) {
			console.log(userData);
			fetchUserAdventures();
		}
	}, [userData]);

	return (
		<>
			<Row>
				<NavComponent />
			</Row>
			<Container className="py-4">
				{userData && (
					<>
						<Row className="justify-content-center mt-4">
							<Col md={{ span: 6 }}>
								<Card className="card-background">
									<Card.Body>
										<Card.Title className="text-center">
											Welcome to {userData?.username}'s Page!
										</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row className="justify-content-center mt-4">
							<Col md={{ span: 6 }}>
								<Card className="card-background">
									<Card.Body>
										<Card.Title className="text-center">
											<img
												style={{
													objectFit: "cover",
													height: "150px",
													borderTopLeftRadius: "12px",
													borderTopRightRadius: "12px",
												}}
												src={
													userData.prof_pic ||
													"https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
												}
												alt="Profile Picture"
											/>
											<h6>{userData.biography}</h6>
										</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row className="justify-content-center mt-4">
							<Col md={{ span: 6 }}>
								<Card className="card-background">
									<Card.Body>
										<Card.Title className="text-center">
											Upload Profile Picture
										</Card.Title>
										<div className="text-center">
											<UploadBioPic
												update={(
													url = userData.prof_pic,
													bio = userData.biography
												) =>
													setUserData({
														...userData,
														prof_pic: url,
														biography: bio,
													})
												}
											/>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row className="justify-content-center py-4">
							<Col md={{ span: 6 }}>
								<Card className="card-background">
									<Card.Body>
										<Card.Title className="text-center">Your posts:</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row className="card-container">
							{userAdventures.map((adventure) => (
								<Col key={adventure.id} md={3} style={{ marginBottom: "20px" }}>
									<Link
										to={`/adventures/${adventure.id}`}
										style={{ textDecoration: "none" }}
									>
										<div className="card" style={{ width: "18rem" }}>
											<img
												src={adventure.image_url}
												className="card-img-top"
												alt="Adventure Thumbnail"
												style={{
													objectFit: "cover",
													height: "150px",
													borderTopLeftRadius: "12px",
													borderTopRightRadius: "12px",
												}}
											/>
											<div className="card-body">
												<h5 className="card-title card-center">
													{adventure.title}
												</h5>
												<p className="card-text card-center">
													{getActivityName(adventure.activity_id)}
												</p>
												<p className="card-text card-center">
													{adventure.address}
												</p>
												<p className="card-text">
													User Rating:{" "}
													<img
														className="icon"
														src={getRatingIcon(adventure.user_rating)}
														alt="Rating"
													/>
												</p>
												<p className="card-text">
													Price:{" "}
													<img
														className="icon"
														src={getPriceIcon(adventure.price)}
														alt="Price"
													/>
												</p>
												<p className="card-text">
													Intensity:{" "}
													<img
														className="icon"
														src={getIntensityIcon(adventure.intensity)}
														alt="Intensity"
													/>
												</p>
											</div>
										</div>
									</Link>
								</Col>
							))}
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default UserAccountPage;
