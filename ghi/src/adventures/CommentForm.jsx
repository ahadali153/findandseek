import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";

const CreateCommentForm = ({ adventureid }) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentData = {
      ...formData,
      adventure_id: adventureid,
    };

    const commentsURL = `${REACT_APP_API_HOST}/adventures/${adventureid}/comments`;
    const fetchConfig = {
      credentials: "include",
      method: "post",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(commentsURL, fetchConfig);
      if (response.ok) {
        setFormData({
          content: "",
        });
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "5px",
        marginTop: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            onChange={handleFormDataChange}
            placeholder="Your comment..."
            required
            type="text"
            name="content"
            id="content"
            className="form-control"
            value={formData.content}
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ced4da",
            }}
          />
          <label htmlFor="content">Comment</label>
        </div>
        <Button type="submit" variant="primary" style={{ borderRadius: "5px" }}>
          Add Comment
        </Button>
      </form>
    </Container>
  );
};

export default CreateCommentForm;
