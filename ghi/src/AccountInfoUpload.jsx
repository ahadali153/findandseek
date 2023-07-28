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
export default function UploadBioPic() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [ picture, setPicture] = useState(null)
    const { uploadImage } = useImageUploader();

    const handleProfilePictureChange = (event) => {
            const file = event.target.files[0];
            console.log(file)
            setSelectedImage(file);
        };
    const handleProfilePictureUpload = async (event) => {
            event.preventDefault();
            console.log('hello')
            if (selectedImage) {
                const uploadedImageUrl = await uploadImage(selectedImage);
                if (uploadedImageUrl) {
                    console.log(uploadedImageUrl)
                    try {
                        const updateBioPicURL = "http://localhost:8000/accountinfo";
                        const fetchConfig = {
                            credentials: "include",
                            method: "post",
                            body: JSON.stringify(
                                {
                                    profile_picture: uploadedImageUrl,
                                }
                            ),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };

                        const response = await fetch(updateBioPicURL, fetchConfig);
                        if (response.ok) {
                            const profilePic = await response.json();
                            console.log("profile picture url:", profilePic);
                            setPicture(profilePic.profile_picture)
                        } else {
                            console.error("Failed to add profile pic");
                        }
                    } catch (error) {
                        console.error("Error creating profile pic:", error);
                    }
                }
            }
        }
    return (
    <div>
        <input type="file" onChange={handleProfilePictureChange} />
        <button onClick={handleProfilePictureUpload}>Upload</button>
        {picture && <img src={picture} alt="Upload Profile Picture" />}
    </div>
    );
}
