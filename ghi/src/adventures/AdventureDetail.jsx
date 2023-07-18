import React from "react";
import { useParams } from "react-router-dom";

export default function AdventureDetail() {
	const { id } = useParams();
	return <div>Adventure ID: {id}</div>;
}
