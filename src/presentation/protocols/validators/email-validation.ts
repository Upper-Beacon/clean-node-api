import { InvalidParamError } from '../../errors';
import { EmailValidator } from '../email-validator';
import { Validation } from './validation';

export class EmailValidation implements Validation {
  private readonly fieldName: string;
  private readonly emailValidator: EmailValidator;

  constructor(fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName;
    this.emailValidator = emailValidator;
  }

  validate(input: any): Error {
    return !this.emailValidator.isValid(input[this.fieldName]) ? new InvalidParamError(this.fieldName) : null;
  }
}
