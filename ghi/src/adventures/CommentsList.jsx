mport React from "react";
import { useParams } from "react-router-dom";

export default function CommentsList() {
	const { id } = useParams();
	return <div>Adventure ID: {id}</div>;
}
