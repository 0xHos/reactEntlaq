import {Router} from 'express';
import { createAccount, login } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/createAccount', createAccount);
userRouter.post('/login', login);


export {userRouter};