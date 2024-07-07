export class UserNotFound extends Error {
  constructor () {
    super('UserNotFound')
    this.name = 'UserNotFound'
  }
}
