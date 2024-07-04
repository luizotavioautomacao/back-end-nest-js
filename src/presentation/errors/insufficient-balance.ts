export class InsufficientBalance extends Error {
  constructor () {
    super('InsufficientBalance')
    this.name = `InsufficientBalance: You don't have funds to continue!`
  }
}
