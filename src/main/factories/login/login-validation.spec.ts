import { EmailValidator } from '../../../presentation/protocols/email-validator';
import { EmailValidation } from '../../../presentation/protocols/validators/email-validation';
import { RequiredFieldValidation } from '../../../presentation/protocols/validators/required-field-validation';
import { Validation } from '../../../presentation/protocols/validators/validation';
import { ValidationComposite } from '../../../presentation/protocols/validators/validation-composite';
import { makeLoginValidation } from './login-validation';

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

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
