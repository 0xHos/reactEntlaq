import { Request,Response } from "express";
import path from "path";
import {} from 'nodemailer';
import sendEmail from "../utils/sendMail";
import { deleteUserById, getAllUserSub, insertUserSubscription } from "../models";
import { UserSub } from "../models/types";



// insert user in database then return report page for user
 export default async function subscriptionPage(req:Request,res:Response){
    
    const user:UserSub = {
        first_name:req.body?.first_name,
        last_name:req.body?.last_name,
        email:req.body?.email,
        phone:req.body?.phone,
        position:req.body?.position,
    };
    
    
    try{

        await insertUserSubscription(user);
        const html = `<object data='/uploads/${req.body?.reportId}' type="application/pdf" width="100%" height="100%"></object>`
        res.send(html);

    }catch(err){

        console.log(`error insert User Subscription ${err}`);

        res.send('Error Subscription plase try again');

    }
    
}


async function  getUsersSubscription(req:Request,res:Response){
    try{


        let users =  await getAllUserSub();

        res.status(200).json({users:users});

    }catch(err){

        res.status(404).json({msg:"error to get users sub"});
    }


 
}


async function  removeUsersSubscription(req:Request,res:Response){
    try{
        let user_id = +req.params.id;


        let users =  await deleteUserById(user_id)

        res.status(200).json({msg:'done remove user'});

    }catch(err){

        res.status(404).json({msg:"error to remove users sub"});
    }

}


export {getUsersSubscription,removeUsersSubscription}