"use client";
import AWS from "aws-sdk";
import Image from "next/image";
import { useEffect, useState } from "react";

const S3 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: "AKIA5PGIXYQNAI6PWA3M",
      secretAccessKey: "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",
    });

    const params = {
      Bucket: "bug-tracking-tool",
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
        accessKeyId: "AKIA5PGIXYQNAI6PWA3M",
        secretAccessKey: "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",
      });

      const params = {
        Bucket: "bug-tracking-tool",
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
              { Bucket: "bug-tracking-tool", Key: file.Key },
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
    getBucketData();
  }, []);

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default S3;
