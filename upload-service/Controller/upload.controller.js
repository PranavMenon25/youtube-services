import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

const uploadFileTOS3 = async (req, res) => {
    console.log("Upload request received");
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const file = req.file;

    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log('File uploaded successfully:', data);
        return res.status(200).send('File uploaded successfully');
    } catch (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send('Error uploading file');
    }
};

export default uploadFileTOS3 ;
