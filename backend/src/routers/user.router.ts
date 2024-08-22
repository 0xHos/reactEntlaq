import {RequestHandler, Router} from 'express';
import { createAccount, login } from '../controllers/user.controller';
import { checkAuth } from '../utils/token';
import { getUsersSubscription, removeUsersSubscription } from '../controllers/subscription';

const userRouter = Router();

userRouter.post('/createAccount', createAccount);
userRouter.post('/login', login);

userRouter.use(checkAuth as unknown as RequestHandler);
userRouter.get('/users_sub',getUsersSubscription);
userRouter.delete('/users_sub/:id',removeUsersSubscription);

export {userRouter};