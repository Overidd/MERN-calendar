
import { check } from 'express-validator';

export class ValidationEvent {

   static get event() {
      return [
         check('title', 'El título es obligatorio').not().isEmpty(),
         check('start', 'La fecha de inicio es obligatoria').not().isEmpty().custom((value, { req }) => {
            if (!value) {
               throw new Error('La fecha de inicio es obligatoria');
            }

            const date = new Date(value);
            if (isNaN(date.getTime())) {
               throw new Error('La fecha de inicio es inválida');
            }

            if (value > req.body.end) {
               throw new Error('La fecha de inicio debe ser menor a la fecha de finalización');
            }
            return true;

         }),
         check('end', 'La fecha de finalización es obligatoria').not().isEmpty().custom((value, { req }) => {
            if (!value) {
               throw new Error('La fecha de finalización es obligatoria');
            }

            const date = new Date(value);
            if (isNaN(date.getTime())) {
               throw new Error('La fecha de finalización es inválida');
            }

            if (value < req.body.start) {
               throw new Error('La fecha de finalización debe ser mayor a la fecha de inicio');
            }
            return true;
         }),
      ]
   }
}