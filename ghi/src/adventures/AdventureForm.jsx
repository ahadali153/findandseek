import React, { useState, useEffect } from "react";
// 	const [activities, setActivities] = useState([]);
// 	const fetchData = async () => {
// 		const activitiesURL = "http://localhost:8000/activities";

// 		const response = await fetch(activitiesURL);
// 		if (response.ok) {
// 			const data = await response.json();
// 			setActivities(data);
// 		}
// 	};
// 	useEffect(() => {
// 		fetchData();
// 	}, []);

// 	const [formData, setFormData] = useState({
// 		title: "",
// 		description: "",
// 		images: null,
// 		activity: "",
// 		intensity: "",
// 		user_rating: "",
// 		price: "",
// 		address: "",
// 	});
// 	const values = [1, 2, 3, 4, 5];
// 	const [hasCreated, setHasCreated] = useState(false);

// 	const handleFormDataChange = async (event) => {
// 		const name = event.target.name;
// 		const value = event.target.value;
// 		setFormData({ ...formData, [name]: value });
// 	};

// 	const handleImageChange = (event) => {
// 		const file = event.target.files[0];
// 		setFormData((prevFormData) => ({
// 			...prevFormData,
// 			images: file,
// 		}));
// 	};

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();
// 		const data = {};
// 		data.title = formData.title;
// 		data.description = formData.description;
// 		data.images = formData.images;
// 		data.activity = formData.activity;
// 		data.intensity = formData.intensity;
// 		data.user_rating = formData.user_rating;
// 		data.price = formData.price;
// 		data.address = formData.address;
// 		data.likes = 0;
//         data.posted_at =

//         const activitiesURL = "http://localhost:8000/adventures/";
// 		const fetchConfig = {
// 			method: "post",
// 			body: JSON.stringify(data),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		};
// 		const response = await fetch(activitiesURL, fetchConfig);
// 		if (response.ok) {
// 			setFormData({
// 				title: "",
// 				description: "",
// 				images: null,
// 				activity: "",
// 				intensity: "",
// 				user_rating: "",
// 				price: "",
// 				address: "",
// 			});
// 			setHasCreated(true);
// 		}
// 	};
// 	let messageClasses = "alert alert-success d-none mb-0";
// 	let formClasses = "";
// 	if (hasCreated) {
// 		messageClasses = "alert alert-success mb-0";
// 		formClasses = "d-none";
// 	}
// 	return (
// 		<div className="row">
// 			<div className="offset-3 col-6">
// 				<div className="shadow p-4 mt-4">
// 					<h1>Add an adventure!</h1>
// 					<form
// 						className={formClasses}
// 						onSubmit={handleSubmit}
// 						id="create-adventure-form"
// 					>
// 						<div className="form-floating mb-3">
// 							<input
// 								onChange={handleFormDataChange}
// 								placeholder="title..."
// 								required
// 								type="text"
// 								name="title"
// 								id="title"
// 								className="form-control"
// 								value={formData.title}
// 							/>
// 							<label htmlFor="title">Title</label>
// 						</div>
// 						<div className="mb-3">
// 							<select
// 								onChange={handleFormDataChange}
// 								required
// 								name="activity"
// 								id="activity"
// 								className="form-select"
// 								value={formData.activity}
// 							>
// 								<option value="">Activity...</option>
// 								{activities.map((activity) => {
// 									return (
// 										<option key={activity.id} value={activity.id}>
// 											{activity.name}
// 										</option>
// 									);
// 								})}
// 							</select>
// 						</div>
// 						<div className="form-floating mb-3">
// 							<input
// 								onChange={handleFormDataChange}
// 								placeholder="description"
// 								required
// 								type="text"
// 								name="description"
// 								id="description"
// 								className="form-control"
// 								value={formData.description}
// 							/>
// 							<label htmlFor="descriptin">Description</label>
// 						</div>
// 						<div className="mb-3">
// 							<label htmlFor="image">Image:</label>
// 							<input
// 								type="file"
// 								id="image"
// 								name="image"
// 								accept="image/*"
// 								onChange={handleImageChange}
// 							/>
// 						</div>
// 						<div className="mb-3">
// 							<select
// 								onChange={handleFormDataChange}
// 								required
// 								name="price"
// 								id="price"
// 								className="form-select"
// 								value={formData.price}
// 							>
// 								<option value="">Price</option>
// 								{values.map((value) => {
// 									return (
// 										<option key={value} value={value}>
// 											{value}
// 										</option>
// 									);
// 								})}
// 							</select>
// 						</div>
// 						<div className="mb-3">
// 							<select
// 								onChange={handleFormDataChange}
// 								required
// 								name="intensity"
// 								id="intensity"
// 								className="form-select"
// 								value={formData.intensity}
// 							>
// 								<option value="">Intensity</option>
// 								{values.map((value) => {
// 									return (
// 										<option key={value} value={value}>
// 											{value}
// 										</option>
// 									);
// 								})}
// 							</select>
// 						</div>
// 						<div className="mb-3">
// 							<select
// 								onChange={handleFormDataChange}
// 								required
// 								name="user_rating"
// 								id="user_rating"
// 								className="form-select"
// 								value={formData.user_rating}
// 							>
// 								<option value="">User Rating</option>
// 								{values.map((value) => {
// 									return (
// 										<option key={value} value={value}>
// 											{value}
// 										</option>
// 									);
// 								})}
// 							</select>
// 						</div>
// 						<div className="form-floating mb-3">
// 							<input
// 								onChange={handleFormDataChange}
// 								placeholder="address..."
// 								required
// 								type="text"
// 								name="address"
// 								id="address"
// 								className="form-control"
// 								value={formData.address}
// 							/>
// 							<label htmlFor="address">Address</label>
// 						</div>
// 						<button type="submit" className="btn btn-primary">
// 							Add
// 						</button>
// 					</form>
// 					<div className={messageClasses} id="success-message">
// 						Adventure has been created!
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

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
		images: null, // To store the selected image files
	});
	const values = [1, 2, 3, 4, 5];
	const [hasCreated, setHasCreated] = useState(false);

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

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		// Read the image file as binary
		const reader = new FileReader();
		reader.onloadend = () => {
			// Convert the result to bytes
			const imageBytes = new Uint8Array(reader.result);
			setFormData((prevFormData) => ({
				...prevFormData,
				images: Array.from(imageBytes),
			}));
		};
		reader.readAsArrayBuffer(file);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {
			title: formData.title,
			description: formData.description,
			images: formData.images,
			activity_id: formData.activity,
			intensity: formData.intensity,
			user_rating: formData.user_rating,
			price: formData.price,
			address: formData.address,
			likes: 0,
		};

		const adventuresURL = "http://localhost:8000/adventures/";
		const fetchConfig = {
			credentials: "include",
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await fetch(adventuresURL, fetchConfig);
			if (response.ok) {
				setFormData({
					title: "",
					description: "",
					activity: "",
					intensity: "",
					user_rating: "",
					price: "",
					address: "",
					images: null,
				});
				setHasCreated(true);
			} else {
				console.error("Failed to create adventure");
			}
		} catch (error) {
			console.error("Error creating adventure:", error);
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
								className="form-control"
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
							<label htmlFor="descriptin">Description</label>
						</div>
						<div className="mb-3">
							<label htmlFor="image">Image:</label>
							<input
								type="file"
								id="image"
								name="image"
								accept="image/*"
								onChange={handleImageChange}
							/>
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
