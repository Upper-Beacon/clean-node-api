import { EmailValidator } from '../../../presentation/protocols/email-validator';
import { CompareFieldsValidation } from '../../../presentation/protocols/validators/compare-fields-validation';
import { EmailValidation } from '../../../presentation/protocols/validators/email-validation';
import { RequiredFieldValidation } from '../../../presentation/protocols/validators/required-field-validation';
import { Validation } from '../../../presentation/protocols/validators/validation';
import { ValidationComposite } from '../../../presentation/protocols/validators/validation-composite';
import { makeSignUpValidation } from './signup-validation';

jest.mock('../../../presentation/protocols/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
