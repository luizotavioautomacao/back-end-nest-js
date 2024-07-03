import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { RequiredFieldValidation } from 'src/presentation/validators/required-field-validation';
import { EmailValidation } from 'src/presentation/validators/email-validation';
import { EmailValidatorAdapter } from 'src/infra/validators/email-validator-adapter';
import { EmailInUseError } from 'src/presentation/errors/email-in-use-error';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  validate(input: any): Error {
    for (const field of ['username', 'email', 'password']) {
      const requiredFieldValidation = new RequiredFieldValidation(field)
      const error = requiredFieldValidation.validate(input)
      if (error) return error
    }
    const emailValidation = new EmailValidation('email', new EmailValidatorAdapter())
    return emailValidation.validate(input)
  }

  @Post()
  async createUser(@Body() body: { username: string, email: string, password: string }): Promise<User | Error> {
    const { username, email, password } = body
    const error = this.validate({ username, email, password })
    if (error) return error
    const user = this.userService.getOneUserByQuery({ email })
    if (user) return new EmailInUseError()
    return this.userService.createUser(body);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

}
