import express from 'express';
import uploadRouter from './Routes/upload.route.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({
  allowedHeaders: ['*'],
  origin: '*',
}));

app.use(express.json());
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
  res.send('Upload service is running');
});

app.listen(PORT, () => {
  console.log(`Upload service is running on port ${PORT}`);
});