import { UserModel } from "../database/model/User.model.js";
import { generateToken } from "../envs/jwt.js";
import { encryptPassword, validatePassword } from "../helpers/bcrypt.js";

export class AuthController {

   /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    */
   static register = async (req, res) => {
      try {
         const body = req.body;
         
         const existEmail = await UserModel.findOne({ email: body.email })

         if (existEmail) {
            return res.status(401).json({
               ok: false,
               msg: 'El correo ya está registrado'
            })
         }

         const newUser = new UserModel(body);
         // Incritar la contraseña
         newUser.password = await encryptPassword(body.password);

         // Guardar el usuario
         await newUser.save();

         // Generar el JWT
         const token = await generateToken(newUser.id, newUser.name);

         return res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            token
         })

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
         })
      }
   }

   /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    */
   static login = async (req, res) => {

      try {
         const body = req.body;

         const isUser = await UserModel.findOne({ email: body.email })

         if (!isUser) {
            return res.status(401).json({
               ok: false,
               msg: 'El correo no está registrado'
            })
         }

         // Verificar la contraseña
         const validatePass = await validatePassword(body.password, isUser.password);

         if (!validatePass) {
            return res.status(401).json({
               ok: false,
               msg: 'La contraseña es incorrecta'
            })
         }

         // Generar el JWT
         const token = await generateToken(isUser.id, isUser.name);

         return res.status(200).json({
            ok: true,
            uid: isUser.id,
            name: isUser.name,
            token
         })
      } catch (error) {
         return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
         })
      }
   };

   static renewToken = async (req, res) => {
      try {
         
         const { id, name } = req.user;

         // Generar el JWT
         const token = await generateToken(id, name);
         return res.status(200).json({
            ok: true,
            uid: id,
            name,
            token
         })

      } catch (error) {
         return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
         })
      }

   }

}

