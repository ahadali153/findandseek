import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MapComponent from "./GoogleMap";
import NavComponent from "./Nav"

export default function MainPage() {
	const [adventures, setAdventures] = useState([]);

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
				console.log(activity, adventure.activity_id)
				console.log(intensity, adventure.intensity)
				console.log(price, adventure.price)
				const activityFilter = activity === null || adventure.activity_id === activity;
				const intensityFilter = intensity === null || adventure.intensity === intensity;
				const priceFilter = price === null || adventure.price === price;

      			return activityFilter && intensityFilter && priceFilter;
    	});
		console.log(filteredAdventures)
		setAdventures(filteredAdventures);
		} catch (error) {
		console.error("Error fetching filtered adventures:", error);
		}
	};

	return (
		<>s
		<Row>
			<NavComponent fetchFilteredAdventures={fetchFilteredAdventures} />
		</Row>
		<div className="custom-background">
			<Container>
        		<Row>
          			<MapComponent adventures={adventures} />
        		</Row>
				<Row>
					{adventures.map((adventure) => (
						<Col key={adventure.id} md={3} style={{ marginBottom: "20px" }}>
							<div
								style={{
									position: "relative",
									width: "100%",
									height: "150px",
									overflow: "hidden",
								}}
							>
								<Link
									to={`/adventures/${adventure.id}`}
									style={{ textDecoration: "none" }}
								>
									<img
										src={adventure.image_url}
										alt="Adventure Thumbnail"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											transition: "transform 0.2s ease-in-out",
										}}
										onMouseOver={(e) =>
											(e.currentTarget.style.transform = "scale(1.1)")
										}
										onMouseOut={(e) =>
											(e.currentTarget.style.transform = "scale(1)")
										}
									/>
								</Link>
							</div>
							<Row style={{ marginTop: "10px" }}>
								<Col>
									<h4>User Rating: {adventure.user_rating}</h4>
								</Col>
								<Col>
									<h4>Price: {adventure.price}</h4>
								</Col>
								<Col>
									<h4>Intensity: {adventure.intensity}</h4>
								</Col>
							</Row>
							<h2>{adventure.title}</h2>
							<h5>{adventure.address}</h5>
						</Col>
					))}
				</Row>
			</Container>
		</div>
		</>
	);
}
