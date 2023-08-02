import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "./Carousel-pictures/image1.jpg";
import image2 from "./Carousel-pictures/image2.jpg";
import image3 from "./Carousel-pictures/image3.jpg";
import image4 from "./Carousel-pictures/image4.jpg";
import image5 from "./Carousel-pictures/image5.jpg";
import image6 from "./Carousel-pictures/image6.jpg";
import image7 from "./Carousel-pictures/image7.jpg";
import image8 from "./Carousel-pictures/image8.jpg";
import image9 from "./Carousel-pictures/image9.jpg";
import image10 from "./Carousel-pictures/image10.jpg";
import image11 from "./Carousel-pictures/image11.jpg";
import image12 from "./Carousel-pictures/image12.jpg";

const CarouselPics = () => {
	const carouselImageNames = [
		image1,
		image2,
		image3,
		image4,
		image5,
		image6,
		image7,
		image8,
		image9,
		image10,
		image11,
		image12,
	];
	return (
		<Carousel>
			{carouselImageNames.map((image, index) => (
				<Carousel.Item key={index}>
					<img
						className="d-block w-100"
						src={image}
						alt={`Image ${index + 1}`}
					/>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default CarouselPics;
