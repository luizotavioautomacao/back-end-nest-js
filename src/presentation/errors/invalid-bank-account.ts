export class InvalidBankAccount extends Error {
  constructor () {
    super('InvalidBankAccount')
    this.name = 'InvalidBankAccount'
  }
}
