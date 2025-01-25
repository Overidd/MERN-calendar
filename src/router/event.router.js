
/**
 * Rutas de autenticación
 ** /api/event
 * 
 */
import { Router } from 'express';
import { validateFields } from '../middlewares/validationCampos.js';
import { ValidationEvent } from '../helpers/validationEvent.js';
import { validateJWT } from '../middlewares/validationJwt.js';
import { EventController } from '../controller/event.controller.js';


export class EventRouter {
   static init() {
      const router = Router();

      // Crea un nuevo evento
      router.post('/create', [validateJWT, ...ValidationEvent.event, validateFields], EventController.create);

      // Actualiza un evento con el id
      router.put('/update/:id', [validateJWT, ...ValidationEvent.event, validateFields], EventController.update);

      // Obtiene todos los eventos
      router.get('/notes/all', [validateJWT], EventController.getAll);

      // Obtiene un evento con el id
      router.get('/notes/:id', [validateJWT], EventController.getById);

      // Elimina un evento con el id
      router.delete('/delete/:id', [validateJWT], EventController.delete);

      return router;
   }
}
