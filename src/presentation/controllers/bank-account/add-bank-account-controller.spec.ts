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

interface SutTypes {
    sut: AddBankController,
    validationStub: IValidation
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const sut = new AddBankController(validationStub)
    return {
        sut,
        validationStub
    }
}

const makeValidation = () => {
    class ValidationStub implements IValidation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}


describe('AddBankAccount Controller', () => {

    test('Should call IValidation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validadeSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validadeSpy).toHaveBeenCalledWith(httpRequest.body)
    })

})
