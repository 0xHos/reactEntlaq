import {Request , Response} from'express';
import { deleteMessageById, getMessages, insertMessage } from "../models";
import { Message } from "../models/types";

async function addMessage(req:Request,res:Response){

    let message = req.body as Message;
    console.log(message);
    console.log(req.body);
    console.log(req.ip);


    try{

        await insertMessage(message);

        res.status(201).json({msg:"Done add Message"});

    }catch(err){

        console.log(`error insert Message ${err}`);

        res.status(404).json({msg:"error add Message"});

    }


}



async function fetchMessages(req:Request,res:Response){
    try{

        let messages =  await getMessages();

        res.status(200).json(messages);

    }catch(err){

        res.status(404).json({msg:"error to get messages"});
    }
    
}

async function deleteMessage(req:Request,res:Response){

    let message_id = +req.params.id;

    try{

        await deleteMessageById(message_id);

        res.status(201).json({msg:"Done delete Message"});

    }catch(err){

        console.log(`error delete Message ${err}`);

        res.status(404).json({msg:"error delete Message"});

    }
    
}



export {addMessage , fetchMessages,deleteMessage}