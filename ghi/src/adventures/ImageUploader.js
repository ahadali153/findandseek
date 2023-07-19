// import AWS from "aws-sdk";
// import { useState } from "react";

// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   region: "us-east-1",
//   signatureVersion: "v4",
//   maxRetries: 3,
// });

// export default async function ImageUploader({ selectedImage }) {
//   const s3 = new AWS.S3();
//   const [imageUrl, setImageUrl] = useState(null);
//   // const [file, setFile] = useState(null);

//   // const handleFileSelect = (e) => {
//   //   setFile(e.target.files[0]);
//   // };
//   if (!selectedImage) {
//     return;
//   }
//   const params = {
//     Bucket: "findandseek",
//     Key: `${Date.now()}.${selectedImage.name}`,
//     Body: selectedImage,
//   };
//   const { Location } = await s3.upload(params).promise();
//   setImageUrl(Location);
//   console.log("uploading to s3", Location);
// }

import AWS from "aws-sdk";
import { useState } from "react";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
  signatureVersion: "v4",
  maxRetries: 3,
});

export function useImageUploader() {
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (selectedImage) => {
    if (!selectedImage) {
      return;
    }

    const s3 = new AWS.S3();
    const params = {
      Bucket: "findandseek",
      Key: `${Date.now()}.${selectedImage.name}`,
      Body: selectedImage,
    };

    try {
      const { Location } = await s3.upload(params).promise();
      setImageUrl(Location);
      console.log("uploading to s3", Location);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    console.log(Location);
  };

  return {
    imageUrl,
    uploadImage,
  };
}
