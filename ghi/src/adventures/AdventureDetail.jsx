import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getRatingIcon, getPriceIcon, getIntensityIcon } from "../GoogleMap";
import "./AdventureDetail.css";

const AdventureDetail = () => {
  const [adventure, setAdventure] = useState(null);
  const { adventureid } = useParams();
  const [activityMap, setActivityMap] = useState({});

  const fetchAllActivities = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_HOST}/activities`);
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
    const fetchAdventureDetails = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_HOST}/adventures/${adventureid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch adventure details.");
        }
        const adventureData = await response.json();
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
        <Col md={{ span: 12 }}>
          <Card className="card-background">
            <Card.Body>
              <h1 className="text-center h1-background">{adventure.title}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={{ span: 12 }} className="text-center">
          <div className="img-container fixed-image-container">
            <img
              src={adventure.image_url}
              alt="Adventure Thumbnail"
              className="img-fluid rounded"
            />
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={{ span: 6 }}>
          <Card className="card-background">
            <Card.Body>
              <Card.Title className="text-center">Activity</Card.Title>
              <Card.Text className="text-center">
                {getActivityName(adventure.activity_id)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 6 }}>
          <Card className="card-background">
            <Card.Body>
              <Card.Title className="text-center">Address</Card.Title>
              <Card.Text className="text-center">{adventure.address}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={{ span: 4 }}>
          <Card className="card-background">
            <Card.Body>
              <Card.Title className="text-center">Rating</Card.Title>
              <Card.Text className="text-center">
                <img
                  src={getRatingIcon(adventure.user_rating)}
                  alt={`Rating ${adventure.user_rating}`}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 4 }}>
          <Card className="card-background">
            <Card.Body>
              <Card.Title className="text-center">Price</Card.Title>
              <Card.Text className="text-center">
                <img
                  src={getPriceIcon(adventure.price)}
                  alt={`Price ${adventure.price}`}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 4 }}>
          <Card className="card-background">
            <Card.Body>
              <Card.Title className="text-center">Intensity</Card.Title>
              <Card.Text className="text-center">
                <img
                  src={getIntensityIcon(adventure.intensity)}
                  alt={`Intensity ${adventure.intensity}`}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={{ span: 12 }}>
          <Card className="card-background">
            <Card.Body>
              <Card.Title className="text-center">Description</Card.Title>
              <Card.Text className="text-center">
                {adventure.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdventureDetail;
