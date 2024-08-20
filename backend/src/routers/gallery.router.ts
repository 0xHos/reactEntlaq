import {RequestHandler, Router} from 'express';
import { checkAuth } from '../utils/token';
import { upload } from '../middlewares/uploadfImage';
import { addGallery, deleteGallery, deleteGalleryImage, fetchGalleryById } from '../controllers/gallery.controller';

export const galleryRouter = Router();

galleryRouter.get("/:id" , fetchGalleryById);
galleryRouter.use(checkAuth as unknown as RequestHandler);
galleryRouter.post('/', upload.single('car_img'), addGallery);
galleryRouter.delete("/:id" , deleteGallery);
galleryRouter.delete("/image/:id" , deleteGalleryImage);