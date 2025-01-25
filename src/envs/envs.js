import dotenv from 'dotenv';

dotenv.config();


export const env = {
   PORT: process.env.PORT,
   MONGODB_URI: process.env.MONGODB_URI,
   MONGODB_NAME_DB: process.env.MONGODB_NAME_DB,
   KEY_JWT: process.env.KEY_JWT,
}
