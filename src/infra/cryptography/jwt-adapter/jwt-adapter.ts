import jwt from 'jsonwebtoken';
import { Encrypter } from '../../../data/protocols/cryptography/encrypter';

export class JwtAdapter implements Encrypter {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
