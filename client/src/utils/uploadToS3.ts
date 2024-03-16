import AWS from "aws-sdk";

export const uploadToS3 = async (files: File[]) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_S3_REGION,
    });
    // AWS.config.update({  });
    const imageUrls: string[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
        Key: file.name,
        Body: file,
        ContentType: file.type,
      };

      const data = await s3.upload(params).promise();
      imageUrls.push(data.Location);
    }

    return imageUrls;
  } catch (error) {
    throw error;
  }
};
