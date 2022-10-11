import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

const natsWrapperSpy = jest.spyOn(natsWrapper.client, 'publish');

it('marks an order as cancelled', async () => {
  // create a ticket with Ticket Model
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.getAuthCookie();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel order
  const { body: cancelledOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // expectation to make sure the order is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits a order cancelled event', async () => {
  // create a ticket with Ticket Model
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.getAuthCookie();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel order
  const { body: cancelledOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  console.log(order.ticket);

  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
  expect(natsWrapperSpy.mock.calls[1][0]).toEqual('order:cancelled');
});
