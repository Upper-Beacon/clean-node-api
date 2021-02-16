import { CompareFieldsValidation } from '../../../presentation/protocols/validators/compare-fields-validation';
import { EmailValidation } from '../../../presentation/protocols/validators/email-validation';
import { RequiredFieldValidation } from '../../../presentation/protocols/validators/required-field-validation';
import { Validation } from '../../../presentation/protocols/validators/validation';
import { ValidationComposite } from '../../../presentation/protocols/validators/validation-composite';
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter';

const REQUIRED_FIELDS: string[] = ['name', 'email', 'password', 'passwordConfirmation'];

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of REQUIRED_FIELDS) validations.push(new RequiredFieldValidation(field));

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
