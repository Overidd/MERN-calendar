import jwt from 'jsonwebtoken';
import { env } from './envs.js';


// Genrar un nuevo token
export const generateToken = async (id, name) => {

   return new Promise((resolve, reject) => {
      const payload = { id, name };

      jwt.sign(payload, env.KEY_JWT, {
         expiresIn: '2h'
      }, (err, token) => {

         if (err) {
            reject('No se pudo generar el token');
            return
         }
         resolve(token);
      })
   })
}


// Validar el token
export const validateToken = async (token) => {
   return new Promise((resolve, reject) => {
      jwt.verify(token, env.KEY_JWT, (err, decoded) => {
         if (err) {
            reject('No se pudo validar el token');
            return
         }
         resolve(decoded);
      })
   })
}