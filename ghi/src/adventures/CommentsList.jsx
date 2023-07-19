// CommentList.js
import React, { useEffect, useState } from "react";

const COMMENTS_PER_PAGE = 5; // Number of comments per page

const CommentList = ({ adventure }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/adventures/${adventure.id}/comments?page=${currentPage}&limit=${COMMENTS_PER_PAGE}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments.");
        }
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [adventure.id, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentList;
