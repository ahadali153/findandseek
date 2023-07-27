import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MapComponent from "./GoogleMap";
import "./MainPage.css";
import NavComponent from "./Nav"

export default function MainPage() {
	const [adventures, setAdventures] = useState([]);
	const [activityMap, setActivityMap] = useState({});

	const fetchAdventures = async () => {
		try {
			const response = await fetch("http://localhost:8000/adventures");
			const data = await response.json();

			// Shuffle the data to get random items
			const shuffledData = shuffleArray(data);

			// Slice the first 10 items
			const randomAdventures = shuffledData.slice(0, 10);

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

	const fetchFilteredAdventures = async (activity = null, intensity = null, price = null) => {
		try {
			const response = await fetch("http://localhost:8000/adventures");
			const data = await response.json();
			console.log(data)
			const filteredAdventures = data.filter((adventure) => {
				console.log(typeof(activity), typeof(adventure.activity_id))
				console.log(intensity, adventure.intensity)
				console.log(price, adventure.price)
				const activityFilter = activity === null || adventure.activity_id == activity;
				const intensityFilter = intensity === null || adventure.intensity == intensity;
				const priceFilter = price === null || adventure.price == price;

      			return activityFilter && intensityFilter && priceFilter;
    	});
		console.log(filteredAdventures)
		setAdventures(filteredAdventures);
		} catch (error) {
		console.error("Error fetching filtered adventures:", error);
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
			{adventures.map((adventure) => (
				<Col key={adventure.id} md={3} style={{ marginBottom: "20px" }}>
				{/* Use the Link component to make the entire card clickable */}
				<Link to={`/adventures/${adventure.id}`} style={{ textDecoration: "none" }}>
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
						<h5 className="card-title">{adventure.title}</h5>
						<p className="card-text">Activity: {getActivityName(adventure.activity_id)}</p>
						<p className="card-text">Address: {adventure.address}</p>
						<p className="card-text">User Rating: {adventure.user_rating}</p>
						<p className="card-text">Price: {adventure.price}</p>
						<p className="card-text">Intensity: {adventure.intensity}</p>
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
