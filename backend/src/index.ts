import express  from "express";
import {config} from 'dotenv';
import { initSqlite } from "./models/config";
import cors from "cors";
import bodyParser from 'body-parser';
import { carouselRouter } from "./routers/carousel.router";
import { PORT, uploadPath } from "./config";
import fs from 'fs';
import { userRouter } from "./routers/user.router";
import { fetchCountPagination } from "./controllers/carousel.controller";
import { galleryRouter } from "./routers/gallery.router";
import { messageRouter } from "./routers/message.router";





config();

const app = express();


app.use('/uploads', express.static('uploads'));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))




app.get('/api/count/:page/:section', fetchCountPagination)
app.use('/api/carousels',carouselRouter);
app.use("/api/users" , userRouter);
app.use("/api/gallery" , galleryRouter);
app.use("/api/messages" , messageRouter);






function createUploadFolder(){
  fs.access(uploadPath, (error) => {
    if (error) {
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          return console.error('Error creating uploads directory:', err);
        }
        console.log('Directory uploads created successfully!');
      });
    } else {
      console.log('Directory uploads already exists!');
    }
  });
}



// this function to insert important info like admin and the data must be one data


// run server and create database;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    initSqlite();
    createUploadFolder();
})
