/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../config/app';

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'john_doe@mail.com',
        password: 'abcd1234',
        passwordConfirmation: 'abcd1234',
      })
      .expect(200);
  });
});
