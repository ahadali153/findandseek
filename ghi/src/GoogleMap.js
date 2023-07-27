import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Rating1 from "./images/Rating1.png";
import Rating2 from "./images/Rating2.png";
import Rating3 from "./images/Rating3.png";
import Rating4 from "./images/Rating4.png";
import Rating5 from "./images/Rating5.png";
import Price1 from "./images/Price1.png";
import Price2 from "./images/Price2.png";
import Price3 from "./images/Price3.png";
import Price4 from "./images/Price4.png";
import Price5 from "./images/Price5.png";
import Intensity1 from "./images/Intensity1.png";
import Intensity2 from "./images/Intensity2.png";
import Intensity3 from "./images/Intensity3.png";
import Intensity4 from "./images/Intensity4.png";
import Intensity5 from "./images/Intensity5.png";
import "./GoogleMap.css";

  const getRatingIcon = (rating) => {
    switch (rating) {
      case 1:
        return Rating1;
      case 2:
        return Rating2;
      case 3:
        return Rating3;
      case 4:
        return Rating4;
      case 5:
        return Rating5;
      default:
        return null;
    }
  };

const getPriceIcon = (price) => {
  switch (price) {
    case 1:
      return Price1;
    case 2:
      return Price2;
    case 3:
      return Price3;
    case 4:
      return Price4;
    case 5:
      return Price5;
    default:
      return null;
  }
};

const getIntensityIcon = (intensity) => {
  switch (intensity) {
    case 1:
      return Intensity1;
    case 2:
      return Intensity2;
    case 3:
      return Intensity3;
    case 4:
      return Intensity4;
    case 5:
      return Intensity5;
    default:
      return null;
  }
};

export default function MapComponent({ adventures }) {
  const [map, setMap] = useState(null);
  // Use useNavigate to get the navigation function
  const navigate = useNavigate();
  const [infoWindow, setInfoWindow] = useState(null);
  const [markers, setMarkers] = useState([]);
  // Use useRef to store the latest adventures
  const latestAdventures = useRef(adventures);
  const [activityMap, setActivityMap] = useState({});

  useEffect(() => {
    // Store the latest adventures in the ref
    latestAdventures.current = adventures;
  }, [adventures]);

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Fetch all activities and map them to their IDs
    fetchAllActivities().then((activities) => {
      const mappedActivities = activities.reduce((acc, activity) => {
        acc[activity.id] = activity.name;
        return acc;
      }, {});
      setActivityMap(mappedActivities);
    });
  }, []);

  useEffect(() => {
    // Add markers for each adventure to the map
    if (map && adventures.length > 0) {
      const newMarkers = adventures.map((adventure) => {
        const marker = new window.google.maps.Marker({
          position: { lat: adventure.latitude, lng: adventure.longitude },
          map,
          title: getActivityName(adventure.activity_id)
        });

        // Add click event listener to the marker
        marker.addListener("click", () => {
          // Handle marker click event
          const clickedLatitude = adventure.latitude;
          const clickedLongitude = adventure.longitude;

          // Fetch the adventures based on the clicked location's latitude and longitude
          const adventuresAtLocation = adventures.filter(
            (adv) =>
              adv.latitude === clickedLatitude &&
              adv.longitude === clickedLongitude
          );

          // Open the InfoWindow and show adventure details
          if (infoWindow) {
            infoWindow.close();
          }

          const content = `
            <div>
              <h3>${
                adventuresAtLocation.length > 1 ? "Adventures" : "Adventure"
              } at this location:</h3>
              <ul>
                ${adventuresAtLocation
                  .map(
                    (adventure) => `
                      <li>
                        <strong><a href="/adventures/${adventure.id}">${adventure.title}</a></strong><br />
                        Activity: ${getActivityName(adventure.activity_id)}<br />
                        User Rating: <img class="adventure-image" src="${getRatingIcon(adventure.user_rating)}" alt="Rating" /><br />
                        Price: <img src="${getPriceIcon(adventure.price)}" alt="Price" /><br />
                        Intensity: <img src="${getIntensityIcon(adventure.intensity)}" alt="Intensity" /><br />
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            </div>
          `;
          const newInfoWindow = new window.google.maps.InfoWindow({
            content,
          });
          newInfoWindow.open(map, marker);
          setInfoWindow(newInfoWindow);
        });

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [map, adventures, infoWindow]);

  // Helper function to fetch all activities from the backend
  const fetchAllActivities = async () => {
    try {
      const response = await fetch("http://localhost:8000/activities");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching activities:", error);
      return [];
    }
  };

  // Helper function to fetch activity name based on activity ID
  const getActivityName = (activityId) => {
    return activityMap[activityId] || "Unknown Activity";
  };

  const initMap = () => {
    console.log("Initializing the map...");
    // Get the coordinates of the first adventure (if available)
    const firstAdventure = adventures.length > 0 ? adventures[0] : null;
    const defaultLat = firstAdventure ? firstAdventure.latitude : 38.897957;
    const defaultLng = firstAdventure ? firstAdventure.longitude : -77.03656;

    // Initialize the map centered at the default location
    const mapOptions = {
      center: { lat: defaultLat, lng: defaultLng },
      zoom: 8,
      gestureHandling: "greedy",
    };
    const newMap = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions,
    );

    // Set the map to state
    setMap(newMap);

    const mapElement = document.getElementById("map");
    mapElement.style.borderRadius = "12px";
    mapElement.style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px;";
  };

  return <div className="google-map-container" id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export { getRatingIcon, getPriceIcon, getIntensityIcon };
