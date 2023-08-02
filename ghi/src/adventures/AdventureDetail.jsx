import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getRatingIcon, getPriceIcon, getIntensityIcon } from "../GoogleMap";
import "./AdventureDetail.css";

const AdventureDetail = () => {
	const [adventure, setAdventure] = useState(null);
	const { adventureid } = useParams();
	const [activityMap, setActivityMap] = useState({});

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

	useEffect(() => {
		const fetchAdventureDetails = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_HOST}/adventures/${adventureid}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch adventure details.");
				}
				const adventureData = await response.json();
				setAdventure(adventureData);
			} catch (error) {
				console.error("Error fetching adventure details:", error);
			}
		};

		fetchAdventureDetails();
	}, [adventureid]);

	if (!adventure) {
		return <div>Loading...</div>;
	}

	return (
		<Container className="body-background">
			<Row className="mt-4">
				<Col md={{ span: 12 }}>
					<h1 className="text-center h1-background">{adventure.title}</h1>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col md={{ span: 12 }} className="text-center">
					<div className="img-container fixed-image-container">
						<img
							src={adventure.image_url}
							alt="Adventure Thumbnail"
							className="img-fluid rounded"
							style={{ width: "1000px", height: "500px" }}
						/>
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col md={{ span: 4 }}>
					<div className="text-center shadow-lg p-3 mb-5 rounded">
						<h2>Rating</h2>
						<img
							src={getRatingIcon(adventure.user_rating)}
							alt={`Rating ${adventure.user_rating}`}
							style={{ width: "100px", height: "30px" }}
						/>
					</div>
				</Col>
				<Col md={{ span: 4 }}>
					<div className="text-center shadow-lg p-3 mb-5 rounded">
						<h2>Price</h2>
						<img
							src={getPriceIcon(adventure.price)}
							alt={`Price ${adventure.price}`}
							style={{ width: "100px", height: "30px" }}
						/>
					</div>
				</Col>
				<Col md={{ span: 4 }}>
					<div className="text-center text-center shadow-lg p-3 mb-5 rounded">
						<h2>Intensity</h2>
						<img
							src={getIntensityIcon(adventure.intensity)}
							alt={`Intensity ${adventure.intensity}`}
							style={{ width: "100px", height: "30px" }}
						/>
					</div>
				</Col>
			</Row>
			<div>
				<h3>Activity: {getActivityName(adventure.activity_id)}</h3>
			</div>
			<div className="mt-4">
				<h3>Address: {adventure.address}</h3>
			</div>
			<div className="mt-4">
				<h3>Description: {adventure.description}</h3>
			</div>
			{/* <Row className="mt-4">
				<Col md={{ span: 6 }}>
					<div className="text-center">
						<h3>Activity: {getActivityName(adventure.activity_id)}</h3>
					</div>
				</Col>
				<Col md={{ span: 6 }}>
					<div className="text-center">
						<h3>Address: {adventure.address}</h3>
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col md={{ span: 12 }}>
					<div className="text-center">
						<h3>{adventure.description}</h3>
					</div>
				</Col>
			</Row> */}
		</Container>
	);
};

export default AdventureDetail;
