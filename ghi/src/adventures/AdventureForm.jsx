import React, { useState, useEffect } from "react";
import { useImageUploader } from "./ImageUploader";

export default function CreateAdventure() {
	const [activities, setActivities] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		activity: "",
		intensity: "",
		user_rating: "",
		price: "",
		address: "",
	});
	const values = [1, 2, 3, 4, 5];
	const [hasCreated, setHasCreated] = useState(false);
	const { imageUrl, uploadImage, setImageUrl } = useImageUploader();
	const [selectedImage, setSelectedImage] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedImage(file);
	};

	const fetchData = async () => {
		const activitiesURL = "http://localhost:8000/activities";
		const response = await fetch(activitiesURL);
		if (response.ok) {
			const data = await response.json();
			setActivities(data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleFormDataChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (selectedImage) {
			const uploadedImageUrl = await uploadImage(selectedImage);
			if (uploadedImageUrl) {
				const data = {
					title: formData.title,
					description: formData.description,
					activity_id: formData.activity,
					intensity: formData.intensity,
					user_rating: formData.user_rating,
					price: formData.price,
					address: formData.address,
					likes: 0,
					image_url: uploadedImageUrl,
				};

				console.log("Data to be sent:", data);

				try {
					const adventuresURL = "http://localhost:8000/adventures/";
					const fetchConfig = {
						credentials: "include",
						method: "post",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
						},
					};

					const response = await fetch(adventuresURL, fetchConfig);
					if (response.ok) {
						const createdAdventure = await response.json();
						console.log("Created Adventure:", createdAdventure);
						setFormData({
							title: "",
							description: "",
							activity: "",
							intensity: "",
							user_rating: "",
							price: "",
							address: "",
						});
						setHasCreated(true);
					} else {
						console.error("Failed to create adventure");
					}
				} catch (error) {
					console.error("Error creating adventure:", error);
				}
			}
		}
	};

	let messageClasses = "alert alert-success d-none mb-0";
	let formClasses = "";

	if (hasCreated) {
		messageClasses = "alert alert-success mb-0";
		formClasses = "d-none";
	}

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add an adventure!</h1>
					<form
						className={formClasses}
						onSubmit={handleSubmit}
						id="create-adventure-form"
					>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="title..."
								required
								type="text"
								name="title"
								id="title"
								className="title"
								value={formData.title}
							/>
							<label htmlFor="title">Title</label>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="activity"
								id="activity"
								className="form-select"
								value={formData.activity}
							>
								<option value="">Activity...</option>
								{activities.map((activity) => {
									return (
										<option key={activity.id} value={activity.id}>
											{activity.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="description"
								required
								type="text"
								name="description"
								id="description"
								className="form-control"
								value={formData.description}
							/>
							<label htmlFor="description">Description</label>
						</div>
						<div className="mb-3">
							<input onChange={handleFileChange} type="file" />
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="price"
								id="price"
								className="form-select"
								value={formData.price}
							>
								<option value="">Price</option>
								{values.map((value) => {
									return (
										<option key={value} value={value}>
											{value}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="intensity"
								id="intensity"
								className="form-select"
								value={formData.intensity}
							>
								<option value="">Intensity</option>
								{values.map((value) => {
									return (
										<option key={value} value={value}>
											{value}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormDataChange}
								required
								name="user_rating"
								id="user_rating"
								className="form-select"
								value={formData.user_rating}
							>
								<option value="">User Rating</option>
								{values.map((value) => {
									return (
										<option key={value} value={value}>
											{value}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormDataChange}
								placeholder="address..."
								required
								type="text"
								name="address"
								id="address"
								className="form-control"
								value={formData.address}
							/>
							<label htmlFor="address">Address</label>
						</div>
						<button type="submit" className="btn btn-primary">
							Add
						</button>
					</form>
					<div className={messageClasses} id="success-message">
						Adventure has been created!
					</div>
				</div>
			</div>
		</div>
	);
}
