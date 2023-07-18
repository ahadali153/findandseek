import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
	const [adventures, setAdventures] = useState([]);
	useEffect(() => {
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

	return (
		<div>
			<h1>Adventure List</h1>
			<ul>
				{adventures.map((adventure) => (
					<li key={adventure.id}>
						<Link to={`/adventures/${adventure.id}`}>{adventure.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
