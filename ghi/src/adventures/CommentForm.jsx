import React, { useState, useEffect } from "react";

export default function CreateComment() {
	const [formData, setFormData] = useState({
		content: "",
	});

	const handleFormDataChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const commentData = {
			...formData,
		};

		const commentsURL = `http://localhost:8000/adventures/${adventureId}/comments`;
		const fetchConfig = {
			credentials: "include",
			method: "post",
			body: JSON.stringify(commentData),
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await fetch(adventuresURL, fetchConfig);
			if (response.ok) {
				setFormData({
					comments: "",
				});
			} else {
				console.error("Failed to create adventure");
			}
		} catch (error) {
			console.error("Error creating adventure:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-floating mb-3">
				<input
					onChange={handleFormDataChange}
					placeholder="Your comment..."
					required
					type="text"
					name="content"
					id="content"
					className="form-control"
					value={formData.content}
				/>
				<label htmlFor="content">Comment</label>
			</div>
			<button type="submit" className="btn btn-primary">
				Add Comment
			</button>
		</form>
	);
}
