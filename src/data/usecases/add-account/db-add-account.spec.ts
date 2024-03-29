/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { DbAddAccount } from './db-add-account';
import { AccountModel, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols';

interface SutTypes {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
});

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    hash(password: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }

  return new HasherStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const hasherStub = makeHasher();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub);

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, 'hash');
    await sut.add(makeFakeAccountData());
    expect(hasherSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });
  });

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });
});
