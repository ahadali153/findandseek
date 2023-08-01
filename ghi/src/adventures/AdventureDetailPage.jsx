// AdventureDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdventureDetail from "./AdventureDetail";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import NavComponent from "../DefaultNav";
import { Container, Row } from "react-bootstrap";

const AdventureDetailPage = () => {
  const { adventureid } = useParams();
  const [adventure, setAdventure] = useState(null);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/adventures/${adventureid}`
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
    <>
      <Row>
        <NavComponent />
      </Row>
      <body className="custom-background">
        {adventure ? (
          <>
            <AdventureDetail adventure={adventure} />
            <CommentsList adventure={adventure} />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <CommentForm adventureid={adventureid} />
      </body>
    </>
  );
};

export default AdventureDetailPage;
