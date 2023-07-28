import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadBioPic from "./AccountInfoUpload"

const UserAccountPage = () => {

    const [userData, setUserData] = useState(null);
    const [userAdventures, setUserAdventures] = useState([]);

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



    useEffect(() => {
        if (userData) {
            fetchUserAdventures()
        }
    }, [userData]);

    return (
            <div>
            {userData && (
                <>
                    <h1>Welcome to {userData?.email}'s Page!</h1>
                    <p>User PFP: {userData.profile_picture}</p>
                    <h6>Upload Profile Picture</h6>
                    <UploadBioPic />
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
