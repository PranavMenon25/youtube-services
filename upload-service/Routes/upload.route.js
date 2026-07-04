import express from 'express';
import  uploadFileTOS3  from '../Controller/upload.controller.js';
import multer from 'multer';

const uploadRouter = express.Router();
const upload = multer();
uploadRouter.post('/', upload.single('file'), uploadFileTOS3);

export default uploadRouter;