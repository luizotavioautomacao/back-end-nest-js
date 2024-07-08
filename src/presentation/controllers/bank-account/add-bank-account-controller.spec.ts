import { IHttpResponse } from "src/presentation/protocols/http"
import { AddBankController } from "./add-bank-account-controller"
import { IValidation } from "src/presentation/protocols/validation"
import { badRequest, noContent, serverError } from "../../helpers/http-helper"
import { AddBankAccountModel, IAddBankAccount } from "src/domain/usecases/add-bank-account"
import { mockAddBankAccount } from "../../../domain/usecases/mock-add-bank-account"

const makeFakeRequest = (): IHttpResponse => {
    return {
        statusCode: 200,
        body: mockAddBankAccount
    }
}

interface SutTypes {
    sut: AddBankController,
    validationStub: IValidation,
    addBankAccountStub: IAddBankAccount
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const addBankAccountStub = makeBankAccount()
    const sut = new AddBankController(validationStub, addBankAccountStub)
    return {
        sut,
        validationStub,
        addBankAccountStub
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

const makeBankAccount = () => {
    class AddBankAccountStub implements IAddBankAccount {
        async add(date: AddBankAccountModel): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new AddBankAccountStub()
}

describe('AddBankAccount Controller', () => {

    test('Should call IValidation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validadeSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validadeSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if IValidation fails', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should call AddBankAccount with correct values', async () => {
        const { sut, addBankAccountStub } = makeSut()
        const addSpy = jest.spyOn(addBankAccountStub, 'add')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 500 if AddBankAccount throws', async () => {
        const { sut, addBankAccountStub } = makeSut()
        jest.spyOn(addBankAccountStub, 'add').mockRejectedValueOnce(new Error())
        const httpRequest = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

})
