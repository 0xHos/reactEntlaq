import {NextFunction, Request , Response} from'express';
import { getUserByUsername, insertUser } from "../models";
import { User } from "../models/types";
import { Password } from '../utils/password';
import { Token } from '../utils/token';
import crypto from 'crypto';

async function createAccount(req:Request,res:Response){

    try{
        let user = req.body as User;
        user.id = crypto.randomUUID();
        user.password = await Password.hashPassword(user.password);
        await insertUser(user);
        res.status(201).send({msg:'Done Create User'});
    }catch(err){
        console.error(`[sigup error]=> ${err} `);
        res.status(400).send({err:'Error Create User'});
    }


}



async function login(req:Request,res:Response){

    try{
        let {username , password} = req.body ;
        let user = await getUserByUsername(username);
        let isExist:boolean = await Password.checkHashPassword(password,user?.password as string); 
        console.log(isExist);
        if(isExist){
                
            res.status(200).send({token:Token.createToken({user_id:user?.id,username:user?.username})});
        }else{

            res.status(400).send({err:'ERROR Login'})

        }
    }catch(err){
        console.error(`[login error]=> ${err} `);
        res.status(400).send({err:'Error login'})
    }
    


}


export {createAccount , login};