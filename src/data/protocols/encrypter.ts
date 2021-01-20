/* eslint-disable no-unused-vars */
export interface Encrypter {
  encrypt(password: string): Promise<string>;
}
