import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  // eslint-disable-next-line no-unused-vars
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise(resolve => resolve(null));
  }
}
