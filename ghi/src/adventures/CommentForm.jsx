import React, { useState } from "react";

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
      adventure_id: adventureid, // Add the adventure_id field
    };

    const commentsURL = `http://localhost:8000/adventures/${adventureid}/comments`;
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
        // Clear the form after successful comment submission
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
        />
        <label htmlFor="content">Comment</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Comment
      </button>
    </form>
  );
};

export default CreateCommentForm;
