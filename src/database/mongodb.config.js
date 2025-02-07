import mongoose from 'mongoose';
import { env } from '../envs/index.js';


export const dbConnection = async () => {

   try {
      await mongoose.connect(`${env.MONGODB_URI}`);
      console.log('DB Online');
   } catch (error) {
      console.log(error);
      throw new Error('Error a la hora de iniciar la BD');
   }
}


