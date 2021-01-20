import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
  // eslint-disable-next-line consistent-return
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email'];

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
