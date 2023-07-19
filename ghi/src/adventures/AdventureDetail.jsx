import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="title">
            <h1>{adventure.title}</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="section1">
              <h2>{adventure.activity_id}</h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="section1">
              <h2>Column 1</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="section">
              <h2>{adventure.address}</h2>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>{adventure.description}</h2>
        <h2>{adventure.intensity}</h2>
        <h2>{adventure.user_rating}</h2>
        <h2>{adventure.price}</h2>
      </div>
    </div>
  );
};
export default AdventureDetail;

//     <div className="container-fluid">
//       <div className="row">
//         <div className="col">
//           <div className="title">
//             <h2>{adventure.title}</h2>
//           </div>
//         </div>
//       </div>
//       <div className="container">
//         <div className="section1">
//           <h2>{adventure.activity_id}</h2>
//         </div>
//         <div className="section">
//           <h2>{adventure.address}</h2>
//         </div>
//       </div>
//       <h2>{adventure.description}</h2>
//       <h2>{adventure.intensity}</h2>
//       <h2>{adventure.user_rating}</h2>
//       <h2>{adventure.price}</h2>
//     </div>
//   );
// };
