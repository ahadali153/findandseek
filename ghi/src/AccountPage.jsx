import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useImageUploader } from './AccountImageUploader';
const UserAccountPage = () => {


    const [userData, setUserData] = useState(null);
    const [userAdventures, setUserAdventures] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const { imageUrl, uploadImage } = useImageUploader();
    const fetchUserData = async () => {


    try {
        const response = await axios.get('http://localhost:8000/token', {
            withCredentials: true,
        });
        console.log(response.data.account);
        setUserData(response.data.account);
    } catch (error) {
    console.error('Error fetching user data:', error);
    }
};

    const fetchUserAdventures = async () => {
        try {
            const response = await axios.get('http://localhost:8000/adventures', {
                withCredentials: true,
            });
            console.log(response.data);
            console.log(userData, "cheese")
            // Filter the adventures based on userData.id
            const filteredAdventures = response.data.filter(
                (item) => item.account_id == userData.id
            );
            console.log("filtered:", filteredAdventures)
            setUserAdventures(filteredAdventures);
        } catch (error) {
        console.error('Error fetching adventures:', error);
        }
    };

    useEffect(() => {
        // Fetch user data and user adventures concurrently
        Promise.all([fetchUserData()]);
    }, []);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    useEffect(() => {
        if (userData) {
            fetchUserAdventures()
        }
    }, [userData]);

    const handleProfilePictureUpload = async () => {
        if (!selectedImage) {
            console.error("No image uploaded.");
            return;
    }

    const formData = new FormData();

    formData.append('profilePicture', selectedImage);

        try {
            const response = await axios.post('http://localhost:8000/account/upload-profile-picture', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                const uploadedImageUrl = response.data.imageUrl;
                setUserData((prevUserData) => ({
                ...prevUserData,
                profile_picture: uploadedImageUrl,
                }));
                console.log('Profile picture uploaded successfully.');
            } else {
                console.error('Error uploading profile picture.');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            }
        };

    return (
            <div>
            {userData && (
                <>
                    <h1>Welcome to {userData?.email}'s Page!</h1>
                    <p>User PFP: {userData.profile_picture}</p>
                    <h6>Upload Profile Picture</h6>
                    <input
                        type="file"
                        onChange={handleProfilePictureChange} />
                    <button onClick={handleProfilePictureUpload}>Upload</button>
                    {imageUrl && <img src={imageUrl} alt="Upload Profile Picture" />}
                    <h2>Your Posts:</h2>
                    <div>
                        {userAdventures.map((adventure) => (
                            <div key={adventure.id}>
                                <h3>{adventure.title}</h3>
                                <p>{adventure.description}</p>
                                <img src={adventure.image_url} alt={adventure.title} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserAccountPage;
