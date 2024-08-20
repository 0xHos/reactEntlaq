import {Request , Response} from'express';
import { Carousel } from '../models/types';

import { insertCarousel , getCarouselsByPage, getCarouselsByPageAndSection, getCarouselByPageAndSectionAndId, updateCarouselByPageAndSectionAndId, pagination, deleteCarouselById, countPagination} from '../models/index';




async function addCarousel(req:Request,res:Response){
    

    let carousel = req.body as Carousel;

    let multerRequest = req as (typeof req & {file?:{filename:string}});
    carousel.car_img =  multerRequest.file?.filename;

    try{

        await insertCarousel(carousel);
        res.status(201).json({msg:"Done add carousel"});

    }catch(err){

        console.log(`error insert carousel ${err}`);

        res.status(404).json({msg:"error add carousel"});

    }


}

async function deleteCarousel(req:Request,res:Response){

    let carousel_id = +req.params.id;

    try{

        await deleteCarouselById(carousel_id);

        res.status(201).json({msg:"Done delete carousel"});

    }catch(err){

        console.log(`error delete carousel ${err}`);

        res.status(404).json({msg:"error delete carousel"});

    }


}


async function fetchCarouselsByPage(req:Request,res:Response){
    try{

        let page = req.params.page;

        let carousels =  await getCarouselsByPage(page);

        res.status(200).json({carousels:carousels});

    }catch(err){

        res.status(404).json({msg:"error to get carousels"});
    }
    
}


async function fetchCarouselsByPageAndSection(req:Request,res:Response){
    try{

        let {page,section} = req.params;

        let carousels =  await getCarouselsByPageAndSection(page , section);
        

        res.status(200).json(carousels);

    }catch(err){

        res.status(404).json({msg:"error to get carousels"});
    }
    
}

async function fetchCarouselByPageAndSectionAndId(req:Request,res:Response){
    try{

        let {page,section , id} = req.params;

        let carousels =  await getCarouselByPageAndSectionAndId(page , section , +id);

        res.status(200).json({carousels:carousels});

    }catch(err){
        
        res.status(404).json({msg:"error to get carousel"});
    }
    
}

async function updateCarousel(req:Request,res:Response) {

    let carousel = req.body as Carousel;
    carousel.id = +req.body.id;
    
    let multerRequest = req as (typeof req & {file:{filename:string}});
    if(multerRequest.file){
        carousel.car_img =  `${multerRequest.file.filename}`
    }else{
        carousel.car_img =  req.body.car_img;
    }
    try{

        updateCarouselByPageAndSectionAndId(carousel);

        res.status(201).json({msg:"Done update carousel"});

    }catch(err){

        console.log(`error update carousel ${err}`);

        res.status(404).json({msg:"error update carousel"});

    }

}

async function paginationCarouselAndPage(req:Request,res:Response) {
    let page = req.params.page;
    let section = req.params.section;
    let limit = +req.params.limit;
    let offset = +req.params.offset;

    try{

        let Page =  await pagination(page,section,limit,offset);
        res.status(200).json(Page);

    }catch(err){
        res.status(404).json({msg:"error to get page"});

    }
}

async function fetchCountPagination(req:Request,res:Response) {
    let page = req.params.page;
    let section = req.params.section;
    try{

        let Page =  await countPagination(page,section);
        res.status(200).json(Page);

    }catch(err){
        res.status(404).json({msg:"error to get page"});

    }
}



export { addCarousel, fetchCarouselsByPage, fetchCarouselsByPageAndSection ,fetchCarouselByPageAndSectionAndId , updateCarousel , paginationCarouselAndPage , deleteCarousel , fetchCountPagination};




