import { InvalidParamError } from '../../errors';
import { Validation } from './validation';

export class CompareFieldsValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate(input: any): Error {
    return input[this.fieldName] !== input[this.fieldToCompareName]
      ? new InvalidParamError(this.fieldToCompareName)
      : null;
  }
}
