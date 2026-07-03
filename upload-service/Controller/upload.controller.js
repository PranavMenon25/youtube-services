import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

const uploadFileTOS3 = async (req, res) => {
    const filePath = "D:/youtube-project/upload-service/demo-content/Ava's story.png";
    if (!fs.existsSync(filePath)) {
        console.log('File does not exist:', filePath);
        return res.status(404).send('File does not exist');
    }

    const s3Client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "Ava's story.png",
        Body: fs.createReadStream(filePath),
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
