import { Controller, Get, Post, Param, Request, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { EmailInUseError } from 'src/presentation/errors/email-in-use-error'
import { EmailValidation } from 'src/presentation/validators/email-validation'
import { EmailValidatorAdapter } from 'src/infra/validators/email-validator-adapter'
import { RequiredFieldValidation } from 'src/presentation/validators/required-field-validation'
import { JwtAuthGuard } from './jwt.auth.guard'
import { IUser } from '../user/user.interface'
import { UnauthorizedError } from 'src/presentation/errors/unauthorized-error'
import { ApiTags } from '@nestjs/swagger'


const makeRequiredValidation = (input, field) => {
    const requiredFieldValidation = new RequiredFieldValidation(field)
    const error = requiredFieldValidation.validate(input)
    if (error) return error
}

const makeEmailValidation = (input) => {
    const emailValidation = new EmailValidation('email', new EmailValidatorAdapter())
    return emailValidation.validate(input)
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) { }

    async registerValidate(input: any): Promise<Error> {
        for (const field of ['username', 'email', 'password']) {
            const error = makeRequiredValidation(input, field)
            if (error) return error
        }
        makeEmailValidation(input)
    }

    async loginValidate(input: any): Promise<Error> {
        for (const field of ['email', 'password']) {
            const error = makeRequiredValidation(input, field)
            if (error) return error
        }
        makeEmailValidation(input)
    }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const { email, password } = body
        const error = await this.loginValidate({ email, password })
        if (error) return error
        const user = await this.authService.validateUser(body)
        if (!user) return new UnauthorizedError()
        return this.authService.login(user)
    }

    @Post('register')
    async register(@Body() body: { username: string, email: string, password: string }): Promise<IUser | Error> {
        const { username, email, password } = body
        const error = await this.registerValidate({ username, email, password })
        if (error) return error
        const user = await this.userService.getOneUserByQuery({ email })
        if (user) return new EmailInUseError()
        return this.userService.createUser(body)
    }

    @Get('users')
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Request() req): Promise<IUser[] | Error> {
        if (!req.user.admin) {
            return new UnauthorizedError()
        }
        return this.userService.getAllUsers()
    }

    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    async getUserById(@Param('id') id: string, @Request() req): Promise<IUser | Error> {
        if (req.user._id !== id) {
            return new UnauthorizedError()
        }
        return this.userService.getUserById(id)
    }
}
