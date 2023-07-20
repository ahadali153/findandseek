import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MapComponent({ locations }) {
  const [map, setMap] = useState(null);
  const navigate = useNavigate(); // Use useNavigate to get the navigation function
  const [infoWindow, setInfoWindow] = useState(null);
  const [markers, setMarkers] = useState([]);

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
          const adventureId = location.adventure_id;
          // Open the InfoWindow and show adventure details
          if (infoWindow) {
            infoWindow.close();
          }
          const content = `
            <div>
              <h3>Adventures at this location:</h3>
              <ul>
                ${locations
                  .filter(
                    (loc) =>
                      loc.latitude === location.latitude &&
                      loc.longitude === location.longitude
                  )
                  .map(
                    (loc) =>
                      `<li><a href="/adventures/${loc.adventure_id}">Adventure ID: ${loc.adventure_id}</a></li>`
                  )
                  .join("")}
              </ul>
            </div>
          `;
          const newInfoWindow = new window.google.maps.InfoWindow({ content });
          newInfoWindow.open(map, marker);
          setInfoWindow(newInfoWindow);
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

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}
