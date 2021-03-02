import {
  EmailValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite,
} from '../../../presentation/protocols/validators';
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['email', 'password']) validations.push(new RequiredFieldValidation(field));

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};