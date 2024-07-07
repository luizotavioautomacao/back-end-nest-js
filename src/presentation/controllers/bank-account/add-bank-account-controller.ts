import { badRequest } from "../../helpers/http-helper"
import { IController } from "src/presentation/protocols/controller"
import { IHttpRequest, IHttpResponse } from "src/presentation/protocols/http"
import { IValidation } from "src/presentation/protocols/validation"

export class AddBankController implements IController {
    constructor(
        private readonly validation: IValidation
    ) { }
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const error = this.validation.validate(httpRequest.body)
        if (error) return badRequest(error)
        return new Promise(resolve => resolve(null))
    }
}