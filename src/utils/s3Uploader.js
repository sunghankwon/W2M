import AWS from "aws-sdk";

export default async function s3Uploader(file, fileName, fileType = "") {
  try {
    const ACCESS_KEY = import.meta.env.VITE_S3_ACCESS_KEY;
    const SECRET_ACCESS_KEY = import.meta.env.VITE_S3_SECRET_KEY;
    const REGION = "ap-northeast-2";
    const S3_BUCKET = "word2markdown";

    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });

    const myBucket = new AWS.S3({
      region: REGION,
    });

    const uploadFileName = `uploads/${Date.now()}-${fileName}`;

    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: uploadFileName,
    };

    await myBucket.putObject(params).promise();

    const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${uploadFileName}`;
    return imageUrl;
  } catch (err) {
    console.error("Error uploading to S3", err);
    throw err;
  }
}
