import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

const COMMENTS_PER_PAGE = 5;

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
						<Button variant="primary" onClick={handleNextPage}>
							Next
						</Button>
					</div>
				</>
			)}
		</Container>
	);
};

export default CommentList;
