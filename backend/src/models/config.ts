/**
 *  this file for create tables databes for entlaq by sqlite3
 */


import {Database} from 'sqlite3';
import { dbPath } from '../config';




console.log(`Database Path : ${dbPath}`);

// create database
 const db = new Database( dbPath , (err)=>{
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the  SQlite3 database.');
      
});


// create user table
const createUserTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.run(query, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      }
    });
  };


  // create carousel table that is the main table for website 
const createCarouselTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS carousels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page TEXT,
        section Text,
        car_img TEXT,
        car_title TEXT,
        car_content TEXT,
        car_link TEXT,
        car_link_text TEXT,
        car_name TEXT,
        car_job Text,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.run(query, (err) => {
      if (err) {
        console.error('Error creating carousels table:', err.message);
      }
    });
  };



// create message table;
  const createMessageTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        subject TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.run(query, (err) => {
      if (err) {
        console.error('Error creating messages table:', err.message);
      }
    });
  };

  // create gallery table;
  const createGalleryTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        car_img TEXT,
        section TEXT,
        link TEXT,
        id_car INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_car) REFERENCES carousels(id)
      )
    `;
    db.run(query, (err) => {
      if (err) {
        console.error('Error creating messages table:', err.message);
      }
    });
  };


  // create tables and return handel to db
  export function initSqlite():Database{
    createUserTable();
    createCarouselTable();
    createMessageTable();
    createGalleryTable();
    return db;
  }


