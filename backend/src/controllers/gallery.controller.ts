import { Request,Response } from "express";
import { Gallery } from "../models/types";
import { deleteGalleryById, deleteGalleryImageById, getGalleryByID, insertGallery } from "../models";




export async function addGallery (req:Request,res:Response){

    let gallery = req.body as Gallery;

    const multerRequest = req as (typeof req & {file:{filename:string}}) 
    gallery.car_img =  `${multerRequest.file?.filename as string}`;

    try{

         insertGallery(gallery);

        res.status(201).json({msg:"Done add gallery"});

    }catch(err){

        console.log(`error insert gallery ${err}`);

        res.status(404).json({msg:"error add gallery"});

    }



}



export async function fetchGalleryById(req:Request, res:Response){


    let id:number = +req.params.id;
    
    try{
       
        let gallery =  await getGalleryByID(id);
        res.status(200).json(gallery);

    }catch(err){
        console.log(`error fetch gallery by id ${err}`);

        res.status(404).json({msg:"error fetch gallery"});
    }
}

export async function deleteGallery(req:Request, res:Response){
    let message_id = +req.params.id;

    try{

        await deleteGalleryById(message_id);

        res.status(201).json({msg:"Done delete Gallery"});

    }catch(err){

        console.log(`error delete Gallery ${err}`);

        res.status(404).json({msg:"error delete Gallery"});

    }
}

export async function deleteGalleryImage(req:Request, res:Response){
    let gallery_img_id = +req.params.id;

    try{

        await deleteGalleryImageById(gallery_img_id);

        res.status(201).json({msg:"Done delete Gallery Image"});

    }catch(err){

        console.log(`error delete Gallery Image ${err}`);

        res.status(404).json({msg:"error delete Gallery Image"});

    }
}

