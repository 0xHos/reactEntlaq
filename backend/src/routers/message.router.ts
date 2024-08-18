import {RequestHandler, Router} from 'express';
import { addMessage, deleteMessage, fetchMessages } from '../controllers/message.controller';
import multer from 'multer';
import { checkAuth } from '../utils/token';
const upload = multer(); 


export const messageRouter = Router();

messageRouter.post('/',upload.none(),addMessage);

messageRouter.use(checkAuth as unknown as RequestHandler);
messageRouter.get('/',fetchMessages);
messageRouter.delete('/:id',deleteMessage);


