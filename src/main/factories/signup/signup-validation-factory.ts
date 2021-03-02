import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite,
} from '../../../presentation/protocols/validators';
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter';

const REQUIRED_FIELDS: string[] = ['name', 'email', 'password', 'passwordConfirmation'];

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of REQUIRED_FIELDS) validations.push(new RequiredFieldValidation(field));

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
