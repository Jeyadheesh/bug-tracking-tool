"use client";
import { uploadToS3 } from "@/utils/uploadToS3";
import AWS from "aws-sdk";
import Image from "next/image";
import { useEffect, useState } from "react";

const S3 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files) {
      uploadToS3(event.target.files);
    } else {
      console.log("No file selected");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Key: selectedFile.name,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
      if (err) {
        console.error(err);
        alert("Error uploading file.");
      } else {
        console.log("File uploaded successfully.", data);
        alert("File uploaded successfully.");
      }
    });
  };

  const getBucketData = () => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      };

      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          console.error(err);
          alert("Error listing files.");
        } else {
          console.log("Bucket Data : ", data.Contents);
          // setFiles(data.Contents);
          // console.log(data.Contents);
          data.Contents?.forEach((file) => {
            // console.log(file.Key);
            s3.getSignedUrl(
              "getObject",
              { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME, Key: file.Key },
              (err, url) => {
                if (err) {
                  console.error(err);
                  alert("Error getting file url.");
                } else {
                  console.log("File URL : ", url);
                }
              }
            );
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // getBucketData();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <input type="file" onChange={handleFileChange} multiple />
    </div>
  );
};

export default S3;
