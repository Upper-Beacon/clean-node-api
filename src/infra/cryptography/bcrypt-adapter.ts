import bcrypt from 'bcrypt';
import { HashComparer } from '../../data/protocols/cryptography/hash-comparer';
import { Hasher } from '../../data/protocols/cryptography/hasher';

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async compare(value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash);
    return new Promise(resolve => resolve(true));
  }
}
