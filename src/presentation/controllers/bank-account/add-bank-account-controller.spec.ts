import { IHttpResponse } from "src/presentation/protocols/http"
import { AddBankController } from "./add-bank-account-controller"
import { IValidation } from "src/presentation/protocols/validation"

const makeFakeRequest = (): IHttpResponse => {
    return {
        statusCode: 200,
        body: {
            name: "Luiz Otávio",
            type: "corrente",
            initialBalance: 0,
        }
    }
}

class ValidationStub implements IValidation {
    validate(input: any): Error { 
        return null
    }
}

describe('AddBankAccount Controller', () => {

    test('Should call IValidation with correct values', async () => {
        const validationStub = new ValidationStub()
        const validadeSpy = jest.spyOn(validationStub, 'validate')
        const sut = new AddBankController(validationStub)
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validadeSpy).toHaveBeenCalledWith(httpRequest.body)
    })

})
