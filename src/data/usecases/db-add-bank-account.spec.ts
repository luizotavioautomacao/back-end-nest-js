import { mockAddBankAccount } from "../../domain/usecases/mock-add-bank-account"
import { IAddBankAccountRepository } from "../protocols/db/bank-account/add-bank-account-repository"
import { DbAddBankAccount } from "./db-add-bank-account"
import { AddBankAccountModel } from "src/domain/usecases/add-bank-account"

interface SutTypes {
  sut: DbAddBankAccount,
  addBankAccountRepositoryStub: IAddBankAccountRepository
}

const makeSut = (): SutTypes => {
  const addBankAccountRepositoryStub = makeAddBankAccountRepository()
  const sut = new DbAddBankAccount(addBankAccountRepositoryStub)
  return {
    sut,
    addBankAccountRepositoryStub
  }
}

const makeAddBankAccountRepository = (): IAddBankAccountRepository => {
  class AddBankAccountRepositoryStub implements IAddBankAccountRepository {
    async add(bankAccountData: AddBankAccountModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddBankAccountRepositoryStub()
}


describe('DbAddBankAccount Usecase', () => {

  test('Should call AddBankAccountRepository with correct values', () => {
    const { sut, addBankAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addBankAccountRepositoryStub, 'add')
    sut.add(mockAddBankAccount)
    expect(addSpy).toHaveBeenCalledWith(mockAddBankAccount)
  })

})
