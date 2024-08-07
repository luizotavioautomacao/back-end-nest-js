import { MissingParamError } from "../errors/missing-param-error";
import { IValidation } from "../protocols/validation";

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) { }

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
