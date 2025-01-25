import { generateToken, validateToken } from "../envs/jwt.js";

export const validateJWT = async (req, res, next) => {
   const token = req.header('x-token');

   try {

      if (!token) {
         res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
         })
      }

      const { id, name, iat, exp } = await validateToken(token);

      if (exp < iat) {
         // Generar un nuevo token
         req.token = await generateToken(id, name);
      }

      req.user = { id, name };

      next();

   } catch (error) {
      res.status(401).json({
         ok: false,
         msg: 'Token no válido'
      });
   }
}