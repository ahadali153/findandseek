import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { CloudDirectory } from "aws-sdk";

const AdventureDetail = () => {
  const [adventure, setAdventure] = useState(null);
  const { adventureid } = useParams();

  useEffect(() => {
    const fetchAdventureDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/adventures/${adventureid}`
        );
        console.log("response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch adventure details.");
        }
        const adventureData = await response.json();
        console.log(adventureData);
        setAdventure(adventureData);
      } catch (error) {
        console.error("Error fetching adventure details:", error);
      }
    };

    fetchAdventureDetails();
  }, [adventureid]);

  if (!adventure) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="body-background">
      <Row className="mt-4">
        <Col md={4}>
          <h1 className="text-center h1-background">{adventure.title}</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ offset: 6 }} className="mx-auto">
          <h3 className="text-center h1-background">{adventure.user_rating}</h3>
        </Col>
        <Col md={{ span: 2 }} className="mx-auto">
          <h3 className="text-center h1-background">{adventure.price}</h3>
        </Col>
        <Col md={{ offset: 6 }} className="mx-auto">
          <h3 className="text-center h1-background">{adventure.intensity}</h3>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ offset: 4 }} className="mx-auto">
          <img
            src={adventure.image_url}
            alt="Italian Trulli"
            style={{
              width: "100%",
              height: "50vh",
              objectFit: "cover",
            }}
          ></img>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ offset: 4 }} className="mx-auto">
          <h3 className="text-center custom-background">{adventure.address}</h3>
        </Col>
        <Col md={{ offset: 4 }} className="mx-auto">
          <h3 className="text-center custom-background">
            {adventure.activity_id}
          </h3>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ offset: 4 }} className="mx-auto">
          <h3 className="text-center custom-background">
            {adventure.description}
          </h3>
        </Col>
      </Row>
    </Container>
  );
};
export default AdventureDetail;
