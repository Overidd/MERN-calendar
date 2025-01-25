
/**
 * Rutas de autenticación
 ** /api/auth
 * 
 */
import { Router } from 'express';
import { ValidationAuth } from '../helpers/validationAuth.js';
import { validateFields } from '../middlewares/validationCampos.js';
import { validateJWT } from '../middlewares/validationJwt.js';
import { AuthController } from '../controller/auth.controller.js';

export class AuthRouter {


   static init() {
      const router = Router();

      router.post('/login', [...ValidationAuth.login, validateFields], AuthController.login);

      router.post('/register', [...ValidationAuth.register, validateFields], AuthController.register);

      router.get('/renew', [validateJWT], AuthController.renewToken);

      return router;
   }

}
