import { Publisher, OrderCancelledEvent, Subjects } from '@duexcoast/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
