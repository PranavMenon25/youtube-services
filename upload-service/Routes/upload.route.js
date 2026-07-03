import express from 'express';
import  uploadFileTOS3  from '../Controller/upload.controller.js';

const uploadRouter = express.Router();

uploadRouter.post('/', uploadFileTOS3);

export default uploadRouter;