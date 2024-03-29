/* eslint-disable import/no-extraneous-dependencies */
import { hash } from 'bcrypt';
import { Collection } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

let accountCollection: Collection;

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('abcd1234', 12);
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john_doe@mail.com',
        password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'john_doe@mail.com',
          password: 'abcd1234',
        })
        .expect(200);
    });

    test('Should return 401 on login fail', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'john_doe@mail.com',
          password: 'abcd1234',
        })
        .expect(401);
    });
  });
});
