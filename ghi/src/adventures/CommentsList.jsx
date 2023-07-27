import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

const COMMENTS_PER_PAGE = 5;
const POLL_INTERVAL = 5000;

const CommentList = ({ adventure }) => {
  const [allComments, setAllComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchComments = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:8000/adventures/${adventure.id}/comments?page=${page}&limit=${COMMENTS_PER_PAGE}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments.");
      }
      const commentsData = await response.json();
      setAllComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    // Fetch comments when the component mounts or when the currentPage changes
    fetchComments(currentPage);
  }, [adventure.id, currentPage]);

  useEffect(() => {
    // Start polling for new comments every POLL_INTERVAL
    const intervalId = setInterval(() => {
      console.log("Polling for new comments...");
      fetchComments(currentPage);
    }, POLL_INTERVAL);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [adventure.id, currentPage]);

  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const comments = allComments.slice(startIndex, endIndex);

  return (
    <Container>
      <h2 className="text-center">Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {comments.map((comment) => (
              <li
                key={comment.id}
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
              >
                {comment.content}
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNextPage}
              disabled={comments.length < COMMENTS_PER_PAGE}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CommentList;
