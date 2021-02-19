/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountModel } from '../../../domain/models/account';
import { AuthenticationModel } from '../../../domain/usecases/authentication';
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository';
import { DbAuthentication } from './db-authentication';

interface SutTypes {
  sut: DbAuthentication;
  loadAccountbyEmailRepositoryStub: LoadAccountByEmailRepository;
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAccountbyEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(loadAccountbyEmailRepositoryStub);

  return {
    sut,
    loadAccountbyEmailRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountbyEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountbyEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountbyEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountbyEmailRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });
});
