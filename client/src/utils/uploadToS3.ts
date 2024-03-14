import AWS from "aws-sdk";

export const uploadToS3 = (files: FileList) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_S3_REGION,
    });
    // AWS.config.update({  });

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      // console.log(file);

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
        Key: file.name,
        Body: file,
        ContentType: file.type,
      };

      s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.error("File upload error : ", err.message);
          // alert("Error uploading file.");
        } else {
          console.log("File uploaded successfully.", data);
          // alert("File uploaded successfully.");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
