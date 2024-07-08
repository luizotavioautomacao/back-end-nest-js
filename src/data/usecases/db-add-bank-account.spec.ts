import { mockAddBankAccount } from "../../domain/usecases/mock-add-bank-account"
import { IAddBankAccountRepository } from "../protocols/db/bank-account/add-bank-account-repository"
import { DbAddBankAccount } from "./db-add-bank-account"
import { AddBankAccountModel } from "src/domain/usecases/add-bank-account"

describe('DbAddBankAccount Usecase', () => {

  test('Should call AddBankAccountRepository with correct values', () => {
    class AddBankAccountRepositoryStub implements IAddBankAccountRepository {
      async add(bankAccountData: AddBankAccountModel): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }

    const addBankAccountRepositoryStub = new AddBankAccountRepositoryStub()
    const addSpy = jest.spyOn(addBankAccountRepositoryStub, 'add')
    const sut = new DbAddBankAccount(addBankAccountRepositoryStub)
    sut.add(mockAddBankAccount)
    expect(addSpy).toHaveBeenCalledWith(mockAddBankAccount)
  })

})
