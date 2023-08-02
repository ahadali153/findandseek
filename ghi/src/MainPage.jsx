import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MapComponent from "./GoogleMap";
import "./MainPage.css";
import NavComponent from "./SearchNav";
import { getRatingIcon, getPriceIcon, getIntensityIcon } from "./GoogleMap";
import refresh from "./refreshadventures.png";

export default function MainPage() {
	const [adventures, setAdventures] = useState([]);
	const [activityMap, setActivityMap] = useState({});

	const fetchAdventures = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/adventures`
			);
			const data = await response.json();

			// Shuffle the data to get random items
			const shuffledData = shuffleArray(data);

			// Slice the first 10 items
			const randomAdventures = shuffledData.slice(0, 12);

			setAdventures(randomAdventures);
		} catch (error) {
			console.log("Error fetching adventures:", error);
		}
	};
	useEffect(() => {
		fetchAdventures();
	}, []);

	const shuffleArray = (array) => {
		const shuffled = array.slice();
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	const handleRefreshClick = () => {
		fetchAdventures();
	};

	const fetchFilteredAdventures = async (
		activity = null,
		intensity = null,
		price = null
	) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/adventures`
			);
			const data = await response.json();
			const filteredAdventures = data.filter((adventure) => {
				const activityFilter =
					activity === null || adventure.activity_id == activity;
				const intensityFilter =
					intensity === null || adventure.intensity == intensity;
				const priceFilter = price === null || adventure.price == price;

				return activityFilter && intensityFilter && priceFilter;
			});
			setAdventures(filteredAdventures);
		} catch (error) {
			console.error("Error fetching filtered adventures:", error);
		}
	};

	const fetchAllActivities = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/activities`
			);
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

	return (
		<>
			<Row>
				<NavComponent fetchFilteredAdventures={fetchFilteredAdventures} />
			</Row>
			<div className="custom-background">
				<Container>
					<Row>
						<div className="google-map">
							<MapComponent adventures={adventures} />
						</div>
					</Row>
					<Row>
						<Col md={2} className="text-left">
							{" "}
							{/* Adjust the column size here */}
							<button onClick={handleRefreshClick} className="refresh-button">
								<img
									src={refresh}
									alt="Refresh Adventures"
									className="refresh-icon"
								/>
							</button>
						</Col>
						<Col md={10}></Col>
					</Row>
					<Row className="card-container">
						{adventures.map((adventure) => (
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
				</Container>
			</div>
		</>
	);
}
