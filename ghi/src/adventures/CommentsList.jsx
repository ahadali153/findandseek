import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import "./CommentList.css";

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
    fetchComments(currentPage);
  }, [adventure.id, currentPage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Polling for new comments...");
      fetchComments(currentPage);
    }, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [adventure.id, currentPage]);

  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const comments = allComments.slice(startIndex, endIndex);

  return (
    <Container>
      <Card className="comments-title-card">
        <Card.Body>
          <h2 className="text-center">Comments</h2>
        </Card.Body>
      </Card>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <>
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                {comment.content}
              </li>
            ))}
          </ul>
          <div className="pagination-container">
            <Button
              variant="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNextPage}
              disabled={comments.length < COMMENTS_PER_PAGE}
              className="pagination-button"
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
