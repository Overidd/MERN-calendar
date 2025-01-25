import { Schema, model } from "mongoose";

const eventSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   title: {
      type: String,
      require: true,
   },
   notes: {
      type: String,
   },
   start: {
      type: Date,
      require: true,
   },
   end: {
      type: Date,
      require: true,
   }
})

export const EventModel = model('Event', eventSchema);


