import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from 

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: 'CZQ',
      title: 'j cole concert',
      price: 40,
      userId: 'jkls2',
    });
  } catch (err) {
    console.log(err);
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published.');
  // });
});
