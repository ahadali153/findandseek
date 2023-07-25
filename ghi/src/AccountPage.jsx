import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const UserAccountPage = () => {
    const [userData, setUserData] = useState({});
    const [userAdventures, setUserAdventures] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


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
            console.log(userData)
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
        Promise.all([fetchUserData(), fetchUserAdventures()]);
    }, []);
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleProfilePictureUpload = async () => {
        console.log(setSelectedImage)
        if (!selectedImage) {
            console.error('No image uploaded.');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', selectedImage);

        try {
            const response = await axios.post('http://localhost:8000/upload-profile-picture', formData, {
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
            <h1>Welcome to {userData?.email}'s Page!</h1>
            <p>User PFP: {userData.profile_picture}</p>
            <div>
                {userAdventures.map((adventure) => (
                    <div key={adventure.id}>
                        <h3>{adventure.title}</h3>
                        <p>{adventure.description}</p>
                        <img src={adventure.image_url} alt={adventure.title} />
                    </div>
                ))}
            </div>
            <h6>Upload Profile Picture</h6>
            <input 
                type="file" 
                onChange={handleProfilePictureChange} />
            <button onClick={handleProfilePictureUpload}>Upload</button>
            <h2>Your Posts:</h2>

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
{/* 
            <div className="mb-3">
                <label className="form-label">Image:</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={handleProfilePictureChange}
                />
            </div> */}
        </div>
    );
};

export default UserAccountPage;