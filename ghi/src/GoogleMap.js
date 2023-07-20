import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MapComponent({ locations }) {
  const [map, setMap] = useState(null);
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  const [infoWindow, setInfoWindow] = useState(null);
  const [markers, setMarkers] = useState([]);
  const latestLocations = useRef(locations); // Use useRef to store the latest locations

  useEffect(() => {
    // Store the latest locations in the ref
    latestLocations.current = locations;
  }, [locations]);

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Add markers for each location to the map
    if (map && locations.length > 0) {
      console.log("Adding markers to the map...");
      const newMarkers = locations.map((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.adventure_id.toString(), // Convert adventure_id to string
        });

        // Add click event listener to the marker
        marker.addListener("click", () => {
          // Handle marker click event
          const clickedLatitude = location.latitude;
          const clickedLongitude = location.longitude;

          // Fetch the adventures based on the clicked location's latitude and longitude
          fetchAdventuresByLocation(clickedLatitude, clickedLongitude).then(
            (adventures) => {
              // Open the InfoWindow and show adventure details
              if (infoWindow) {
                infoWindow.close();
              }

              const content = `
                <div>
                  <h3>${
                    adventures.length > 1 ? "Adventures" : "Adventure"
                  } at this location:</h3>
                  <ul>
                    ${adventures
                      .map(
                        (adventure) => `
                          <li>
                            <strong><a href="/adventures/${adventure.id}">${adventure.title}</a></strong><br />
                            Activity: ${adventure.activity_id}<br />
                            User Rating: ${adventure.user_rating}<br />
                            Price: ${adventure.price}<br />
                            Intensity: ${adventure.intensity}
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
            }
          );
        });

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [map, locations, infoWindow]);

  const initMap = () => {
    console.log("Initializing the map...");
    // Initialize the map centered at a default location
    const mapOptions = {
      center: { lat: 38.897957, lng: -77.03656 },
      zoom: 8,
    };
    const newMap = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    // Set the map to state
    setMap(newMap);
  };

  // Fetch adventure details based on adventure IDs
  const fetchAdventuresByIds = async (adventureIds) => {
    try {
      const response = await fetch(
        `http://localhost:8000/adventures?ids=${adventureIds.join(",")}`
      );
      const adventures = await response.json();
      return adventures;
    } catch (error) {
      console.log("Error fetching adventure details:", error);
      return [];
    }
  };

  const fetchAdventuresByLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://localhost:8000/locations?latitude=${latitude}&longitude=${longitude}`
      );
      const locationData = await response.json();

      // Use the latest locations from the ref to fetch the adventures
      const adventureIds = locationData.map((loc) => loc.adventure_id);
      const adventures = await fetchAdventuresByIds(adventureIds);
      return adventures;
    } catch (error) {
      console.log("Error fetching adventure details:", error);
      return [];
    }
  };

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}
