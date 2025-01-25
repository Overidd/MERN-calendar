import { EventModel } from "../database/model/Event.model.js";



export class EventController {
   /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    */
   static create = async (req, res) => {

      try {
         const { token = undefined, user, body } = req;

         const newEvent = new EventModel({ ...body, user: user.id });

         await newEvent.save();

         return res.status(201).json({
            ok: true,
            event: newEvent,
            token
         });

      } catch (error) {
         return res.status(400).json({
            ok: false,
            msg: error.message
         });
      }
   }

   /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    */
   static getAll = async (req, res) => {
      const { token = undefined, user } = req;

      const events = await EventModel.find({ user: user.id }).sort({ start: 1 });

      return res.status(200).json({
         ok: true,
         events,
         token
      });
   }

   /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    */
   static getById = async (req, res) => {
      const { token = undefined, user, params } = req;

      const event = await EventModel.findOne({ user: user.id, _id: params.id });

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: 'Evento no encontrado'
         });
      }
      return res.status(200).json({
         ok: true,
         event,
         token
      })
   }

   /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    */
   static delete = async (req, res) => {
      const { token = undefined, user, params } = req;

      const event = await EventModel.findOne({ user: user.id, _id: params.id });

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: 'Evento no encontrado'
         });
      }

      await EventModel.deleteOne({ user: user.id, _id: params.id });

      return res.status(200).json({
         ok: true,
         token
      });
   }

   /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    */
   static update = async (req, res) => {
      const { token = undefined, user, params, body } = req;

      try {
         const event = await EventModel.findOne({ user: user.id, _id: params.id });

         if (!event) {

            return res.status(404).json({
               ok: false,
               msg: 'Evento no encontrado'
            });
         }

         const updatedEvent = await EventModel.findByIdAndUpdate(params.id, body, { new: true });

         return res.status(200).json({
            ok: true,
            event: updatedEvent,
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