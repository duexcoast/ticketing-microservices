import { Schema, model } from 'mongoose';

export interface Ticket {
  title: string;
  price: number;
}

const ticketSchema = new Schema<Ticket>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const Ticket = model<Ticket>('Ticket', ticketSchema);
