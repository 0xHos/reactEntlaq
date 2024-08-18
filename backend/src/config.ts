import path from 'path';


const UPLOAD_PATH = process?.env.UPLOAD_PATH || 'uploads';
const DATABASE_NAME = process?.env.SQLITE_PATH || 'entlaq.db';

export const PORT = process.env.PORT || 8080;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "12345hashsadhahf;ah";
export const dbPath = path.resolve(__dirname,'../', DATABASE_NAME);
export const uploadPath = path.resolve(__dirname,'../', UPLOAD_PATH);
