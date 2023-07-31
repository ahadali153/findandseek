import AWS from "aws-sdk";
import { useState } from "react";

AWS.config.update({
	accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
	region: "us-east-1",
	signatureVersion: "v4",
	maxRetries: 3,
});

export function useImageUploader() {
	const [imageUrl, setImageUrl] = useState(null);

	const uploadImage = async (selectedImage) => {
		if (!selectedImage) {
			return;
		}

		const s3 = new AWS.S3();
		const params = {
			Bucket: "findandseek",
			Key: `${Date.now()}.${selectedImage.name}`,
			Body: selectedImage,
		};

		try {
			const { Location } = await s3.upload(params).promise();
			setImageUrl(Location);
			return Location;
		} catch (error) {
			console.error("Error uploading image:", error);
			return null;
		}
	};

	return {
		imageUrl,
		uploadImage,
		setImageUrl,
	};
}
