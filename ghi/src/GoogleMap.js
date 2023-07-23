import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MapComponent({ adventures }) {
  const [map, setMap] = useState(null);
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  const [infoWindow, setInfoWindow] = useState(null);
  const [markers, setMarkers] = useState([]);
  const latestAdventures = useRef(adventures); // Use useRef to store the latest adventures

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
    // Add markers for each adventure to the map
    if (map && adventures.length > 0) {
      const newMarkers = adventures.map((adventure) => {
        const marker = new window.google.maps.Marker({
          position: { lat: adventure.latitude, lng: adventure.longitude },
          map,
          title: adventure.title,
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
        });

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [map, adventures, infoWindow]);

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
    };
    const newMap = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    // Set the map to state
    setMap(newMap);
  };

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}
