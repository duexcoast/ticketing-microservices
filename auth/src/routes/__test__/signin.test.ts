import request from 'supertest';
import { app } from '../../app';

it('Returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'conorney',
      password: 'password',
    })
    .expect(400);
});

it('Returns a 400 when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('Returns a 400 with an invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'wrong',
    })
    .expect(400);
});

it('sets a cookie on succesful sign in', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password',
  });
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
