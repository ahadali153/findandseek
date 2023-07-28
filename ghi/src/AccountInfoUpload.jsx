import AWS from "aws-sdk";
import { useState } from "react";
import { useImageUploader } from "./adventures/ImageUploader";
AWS.config.update({
	accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
	region: "us-east-1",
	signatureVersion: "v4",
	maxRetries: 3,
});
export default function UploadBioPic({ update }) {
	const [selectedImage, setSelectedImage] = useState(null);
	const [picture, setPicture] = useState(undefined);
	const { uploadImage } = useImageUploader();
	const [biography, SetBiography] = useState(null);
	const [showForm, SetShowForm] = useState(true);
	const handleProfilePictureChange = (event) => {
		const file = event.target.files[0];
		console.log(file);
		setSelectedImage(file);
	};
	const handleProfilePictureUpload = async (event) => {
		event.preventDefault();
		console.log(selectedImage);
		let accountInfo = {};
		if (selectedImage) {
			const uploadedImageUrl = await uploadImage(selectedImage);
			accountInfo = { ...accountInfo, profile_picture: uploadedImageUrl };
		}
		if (biography && biography !== "") {
			accountInfo["biography"] = biography;
		}

		const accountInfo2 = JSON.stringify(accountInfo);

		console.log(accountInfo);
		if (accountInfo2 !== "{}") {
			try {
				const updateBioPicURL = "http://localhost:8000/accountinfo/";
				const fetchConfig = {
					credentials: "include",
					method: "put",
					body: accountInfo2,
					headers: {
						"Content-Type": "application/json",
					},
				};
				const response = await fetch(updateBioPicURL, fetchConfig);
				if (response.ok) {
					const profilePic = await response.json();
					console.log("profile picture url:", profilePic);
					setPicture(profilePic.profile_picture);
					update(picture, biography);
				} else {
					console.error("Failed to add profile pic");
				}
			} catch (error) {
				console.error("Error creating profile pic:", error);
			}
		}
	};
	return (
		<>
			{showForm && (
				<div>
					<input type="file" onChange={handleProfilePictureChange} />
					<input
						type="text"
						placeholder="Add biography..."
						value={biography}
						onChange={(e) => SetBiography(e.target.value)}
					/>
					<button onClick={handleProfilePictureUpload}>Upload Picture</button>
					{picture && <img src={picture} alt="Upload Profile Picture" />}
				</div>
			)}
		</>
	);
}
