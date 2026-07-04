import express from 'express';
import  sendMessageToKafka  from '../Controller/kafkapublisher.controller.js';

const kafkapublishRouter = express.Router();
kafkapublishRouter.post('/', sendMessageToKafka);

export default kafkapublishRouter;