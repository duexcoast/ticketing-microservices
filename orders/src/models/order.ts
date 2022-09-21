import { Schema, model } from 'mongoose';
import { OrderStatus } from '@duexcoast/common';
import { Ticket } from './ticket';

export { OrderStatus };

export interface Order {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: Ticket;
}

const orderSchema = new Schema<Order>(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: Schema.Types.Date,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
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

export const Order = model<Order>('Order', orderSchema);
