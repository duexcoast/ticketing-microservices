import { Model, Schema, model } from 'mongoose';
import { Order, OrderStatus } from './order';

export interface Ticket {
  title: string;
  price: number;
}
export interface TicketMethods {
  isReserved(): Promise<boolean>;
}

type TicketModel = Model<Ticket, {}, TicketMethods>;

const ticketSchema = new Schema<Ticket, TicketModel, TicketMethods>(
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

ticketSchema.method('isReserved', async function isReserved() {
  //  this ==== ticket dcoument that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
});

export const Ticket = model<Ticket, TicketModel>('Ticket', ticketSchema);
