import { MongoHelper as sut } from './mongo-helper';

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let accountCoolection = await sut.getCollection('account');
    expect(accountCoolection).toBeTruthy();
    await sut.disconnect();
    accountCoolection = await sut.getCollection('account');
    expect(accountCoolection).toBeTruthy();
  });
});
