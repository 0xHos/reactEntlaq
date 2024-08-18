import { Carousel, Gallery, Message, User } from "./types";
import { initSqlite } from "./config";
import { promises as fs } from 'fs';
import { uploadPath } from '../config';



const db = initSqlite();


/*

            =========[    sql for carousels table  ]========

*/

export const insertCarousel = (carousel:Carousel):Promise<boolean>=>{
  const query = `INSERT INTO carousels (
                                page, 
                                section, 
                                car_img, 
                                car_title,
                                car_content, 
                                car_link, 
                                car_link_text,
                                car_name,
                                car_job
                                )
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
  
  return new Promise((resolve,reject)=>{
      db.run(query, [carousel.page, carousel.section, carousel.car_img, carousel.car_title,carousel.car_content, carousel.car_link, carousel.car_link_text , carousel.car_name, carousel.car_job], function (err) {
        if(err){
          console.log(`Error inserting carousel: ${err.message}`);
          return reject(false);
        }

        return resolve(true);
      });
      
  });
    

};


export const getCarouselsByPage = (page: string): Promise<Carousel[]> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM carousels WHERE page = ?`;
    db.all(query, [page], (err, rows ) => {
      if (err) {
        return reject(`Error retrieving carousels: ${err.message}`);
      }
      resolve(rows as Carousel[]);
    });
  });
};

export const getCarouselsByPageAndSection = (page:string,section:string):Promise<Carousel[]>=>{
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM carousels WHERE page = ? and section = ?`;
    db.all(query, [page,section], (err, rows ) => {
      if (err) {
        return reject(`Error retrieving carousels: ${err.message}`);
      }
      resolve(rows as Carousel[]);
    });
  });
}

export const getCarouselByPageAndSectionAndId = (page:string,section:string , id:number):Promise<Carousel> =>{
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM carousels WHERE page = ? and section = ? and id = ?`;
    db.get(query, [page,section ,id], (err, row) => {
      if (err) {
        return reject(`Error retrieving carousels: ${err.message}`);
      }
      resolve(row as Carousel);
    });
  });
}


export const getFirstCarouselsByPage = (page:string , section:string):Promise<Carousel>=>{
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM carousels WHERE page = ? and section = ?`;
    db.get(query, [page,section], (err, row) => {
      if (err) {
        return reject(`Error retrieving carousels: ${err.message}`);
      }
      resolve(row as Carousel);
    });
  });
}



export const updateCarouselByPageAndSectionAndId = (carosuel:Carousel):Promise<void> =>{
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE carousels
      SET 
      car_img= ?,
      car_title= ?,
      car_content= ?, 
      car_link= ?, 
      car_link_text=?,
      car_name = ?,
      car_job = ? 
      WHERE page = ? and section = ? and id = ?`;
    db.run(query, [carosuel.car_img, carosuel.car_title,carosuel.car_content,carosuel.car_link,carosuel.car_link_text,carosuel.car_name,carosuel.car_job,carosuel.page,carosuel.section,carosuel.id], (err) => {
      if (err) {
        return reject(`Error retrieving carousels: ${err.message}`);
      }
      console.log(`done update carosuel`);
      resolve();
    });
  });
}

export const deleteCarouselById = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const selectQuery = `
    SELECT "car_img" FROM "carousels" WHERE "id"=?`;

    db.get(selectQuery, [id], async (err, row:Carousel) => {
      if (err) {
        return reject(`Error fetching carousel image: ${err.message}`);
      }
      if (!row) {
        return reject(`Carousel with id ${id} not found`);
      }

      const carImg = row.car_img;

      try {
        if(carImg){
          await fs.unlink(`${uploadPath}/${carImg}`);
          console.log(`Image file ${carImg} deleted successfully`);
        }

        const deleteQuery = `
        DELETE FROM "carousels" WHERE "id"=?`;
        db.run(deleteQuery, [id], (err) => {
          if (err) {
            return reject(`Error deleting carousel: ${err.message}`);
          }
          console.log(`Carousel with id ${id} deleted successfully`);
          resolve();
        });
      } catch (err:any) {
        return reject(`Error deleting image file: ${err.message}`);
      }
    });
  });
}


export const pagination = (page:string,section:string,limit:number,offset:number):Promise<Carousel[]>=>{

  return new Promise((resolve,reject)=>{

    const query = `SELECT * FROM carousels where page= ? and section = ? LIMIT ? OFFSET ?`;

    db.all(query ,[page,section,limit,offset], (err,rows)=>{
      if(err){
        return console.log(`error in pagination ${err.message}`);
      }else{
        resolve(rows as Carousel[]);
      }

    });
  });
}

export const countPagination = (page: string, section: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as total FROM carousels where page=? and section=?`;
    db.get(query, [page, section], (err, row:any) => {
      if (err) {
        console.log(`error in count ${err.message}`);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}



/*

            =========[    sql for messages table  ]========

*/
export const insertMessage = (message:Message):Promise<boolean>=>{
  const query = `INSERT INTO messages (
                               name,
                               email,
                               subject,
                               message
                                )
                                VALUES (?, ?, ?, ?)`;
  
  return new Promise((resolve,reject)=>{
      db.run(query, [message.name,message.email,message.subject,message.message], function (err) {
        if(err){
          console.log(`Error inserting message: ${err.message}`);
          return reject(false);
        }

        return resolve(true);
      });
      
  });
}
    

export const getMessages = (): Promise<Message[]> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Messages`;
    db.all(query, [], (err, rows ) => {
      if (err) {
        return reject(`Error retrieving carousels: ${err.message}`);
      }
      resolve(rows as Message[]);
    });
  });
};


export const deleteMessageById= (id:number):Promise<void> =>{
  return new Promise((resolve, reject) => {
    const query = `
    DELETE FROM "messages" WHERE "id"=?`;
    db.run(query, [id], (err) => {
      if (err) {
        return reject(`Error Deleteing message: ${err.message}`);
      }
      console.log(`done message carosuel`);
      resolve();
    });
  });
}



/*

            =========[    sql for User or Admin table  ]========

*/



export const insertUser= (user:User):Promise<boolean>=>{
  const query = `INSERT INTO users (
                               username,
                               password
                                )
                                VALUES (?, ?)`;
  
  return new Promise((resolve,reject)=>{
      db.run(query, [user.username,user.password], function (err) {
        if(err){
          console.log(`Error inserting user: ${err.message}`);
          return reject(false);
        }

        return resolve(true);
      });
      
  });
    

};


export const getUserByUsername = (username:string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users where username = ?`;
    db.get(query, [username], (err, row) => {
      if (err) {
        return reject(`Error retrieving username: ${err.message}`);
      }
      resolve(row as User);
    });
  });
};



/*

            =========[    sql for gallery table  ]========

*/
export const insertGallery = (gallery:Gallery):Promise<boolean>=>{
  const query = `INSERT INTO gallery (
                               car_img,
                               id_car,
                               section,
                               link
                              )
                                VALUES (? ,? ,? ,?)`;
  
  return new Promise((resolve,reject)=>{
      db.run(query, [gallery.car_img,gallery.id_car,gallery.section,gallery.link], function (err) {
        if(err){
          console.log(`Error inserting Gallery: ${err.message}`);
          return reject(false);
        }

        return resolve(true);
      });
      
  });
}
    

export const getGalleryByID = (id:number): Promise<Gallery[]> => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM gallery WHERE id_car = ?`;
    db.all(query, [id], (err, rows ) => {
      if (err) {
        return reject(`Error retrieving Gallery: ${err.message}`);
      }
      resolve(rows as Gallery[]);
    });
  });
};

export const deleteGalleryById = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION;', (err) => {
        if (err) {
          return reject(`Error beginning transaction: ${err.message}`);
        }

        db.run('DELETE FROM "gallery" WHERE "id_car" = ?;', [id], (err) => {
          if (err) {
            db.run('ROLLBACK;', (rollbackErr) => {
              if (rollbackErr) {
                return reject(`Error rolling back transaction: ${rollbackErr.message}`);
              }
              return reject(`Error deleting from gallery: ${err.message}`);
            });
            return;
          }

          db.run('DELETE FROM "carousels" WHERE "id" = ?;', [id], (err) => {
            if (err) {
              db.run('ROLLBACK;', (rollbackErr) => {
                if (rollbackErr) {
                  return reject(`Error rolling back transaction: ${rollbackErr.message}`);
                }
                return reject(`Error deleting from carousels: ${err.message}`);
              });
              return;
            }

            db.run('COMMIT;', (err) => {
              if (err) {
                return reject(`Error committing transaction: ${err.message}`);
              }
              console.log('Done deleting gallery and carousel');
              resolve();
            });
          });
        });
      });
    });
  });
};



export const deleteGalleryImageById= (id:number):Promise<void> =>{
  return new Promise((resolve, reject) => {
    const query = `
    DELETE FROM "gallery" WHERE "id"=?`;
    db.run(query, [id], (err) => {
      if (err) {
        return reject(`Error Deleteing gallery image: ${err.message}`);
      }
      console.log(`done Deleteing gallery image`);
      resolve();
    });
  });
}


