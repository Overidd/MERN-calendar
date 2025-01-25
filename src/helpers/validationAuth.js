import { check } from 'express-validator';

export class ValidationAuth {

   static get login() {
      return [
         check('email', 'El email es obligatorio').isEmail(),
         check('password', 'La contraseña es obligatoria').not().isEmpty()
      ]
   }
   static get register() {
      return [
         check('name', 'El nombre es obligatorio').not().isEmpty(),
         check('email', 'El email es obligatorio').isEmail(),
         check('password', 'La contraseña es obligatoria').not().isEmpty()
      ]
   }
}
