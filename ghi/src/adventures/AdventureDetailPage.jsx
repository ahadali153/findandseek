// AdventureDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdventureDetail from "./AdventureDetail";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

const AdventureDetailPage = () => {
  const { adventureid } = useParams();
  const [adventure, setAdventure] = useState(null);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/adventures/${adventureid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch adventure.");
        }
        const adventureData = await response.json();
        setAdventure(adventureData);
      } catch (error) {
        console.error("Error fetching adventure:", error);
      }
    };

    fetchAdventure();
  }, [adventureid]);

  return (
    <div>
      {adventure ? (
        <>
          <AdventureDetail adventure={adventure} />
          <CommentsList adventure={adventure} />
        </>
      ) : (
        <div>Loading...</div>
      )}
      <CommentForm adventureid={adventureid} />
    </div>
  );
};

export default AdventureDetailPage;
