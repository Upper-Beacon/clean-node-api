import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'));
  },
}));

const salt: number = 12;

const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

describe('Brypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_password');
    expect(hashSpy).toHaveBeenCalledWith('any_password', salt);
  });

  test('Should return a hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_password');
    expect(hash).toBe('hashed_password');
  });

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const hash = sut.encrypt('any_password');
    await expect(hash).rejects.toThrow();
  });
});
