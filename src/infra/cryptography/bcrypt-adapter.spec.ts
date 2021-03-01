import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'));
  },

  async compare(): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  },
}));

const salt: number = 12;

const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

describe('Brypt Adapter', () => {
  test('Should call hash with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_password');
    expect(hashSpy).toHaveBeenCalledWith('any_password', salt);
  });

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut();
    const hash = await sut.hash('any_password');
    expect(hash).toBe('hashed_password');
  });

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const hash = sut.hash('any_password');
    await expect(hash).rejects.toThrow();
  });

  test('Should call compare with correct value', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBe(true);
  });
});
