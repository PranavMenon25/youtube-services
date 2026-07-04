import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import KafkaConfig from './kafka/kafka.js';

dotenv.config();
const PORT = process.env.PORT || 8001;

const app = express();
app.use(cors({
  allowedHeaders: ['*'],
  origin: '*',
}));

app.use(express.json());

const KafkaConfigClient = new KafkaConfig();
KafkaConfigClient.consume("transcode", (message) => {
  console.log("Received message from Kafka topic 'transcode':", message);
  // Here you can add your logic to handle the received message, e.g., start transcoding
});

app.get('/', (req, res) => {
  res.send('Transcoder service is running');
});

app.listen(PORT, () => {
  console.log(`Transcoder service is running on port ${PORT}`);
});