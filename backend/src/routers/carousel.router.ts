import {RequestHandler, Router} from 'express';
import { addCarousel, deleteCarousel, fetchCarouselsByPage, fetchCarouselsByPageAndSection, fetchCarouselByPageAndSectionAndId, paginationCarouselAndPage, updateCarousel, fetchCountPagination } from '../controllers/carousel.controller';
import { upload } from '../middlewares/uploadfImage';
import { checkAuth } from '../utils/token';

const carouselRouter = Router();
carouselRouter.get('/:page', fetchCarouselsByPage);
carouselRouter.get('/:page/:section', fetchCarouselsByPageAndSection);
carouselRouter.get('/:page/:section/:id', fetchCarouselByPageAndSectionAndId);
carouselRouter.get('/:page/:section/:limit/:offset', paginationCarouselAndPage);


carouselRouter.use(checkAuth as unknown as RequestHandler);
carouselRouter.post('/', upload.single('car_img'), addCarousel);
carouselRouter.put('/',upload.single('car_img'),updateCarousel);

carouselRouter.delete('/:id', deleteCarousel);




export {carouselRouter}