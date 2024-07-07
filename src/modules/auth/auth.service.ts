import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { IUser } from '../user/user.interface'
import { BcryptService } from './bcrypt.service'

interface LoginParams {
    email: string
    password: string
}

interface ValidateCredentials {
    password: string,
    hash: string
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private brcyptService: BcryptService
    ) { }

    async isThereUser(user: LoginParams): Promise<IUser> {
        const getUser = await this.userService.findOneUserByQuery({ email: user.email })
        if (getUser) return getUser
        return null
    }

    async comparePassword(validateCredentials: ValidateCredentials): Promise<boolean> {
        const comparePassword = await this.brcyptService.comparePassword(validateCredentials.password, validateCredentials.hash)
        if (comparePassword) {
            return true
        }
        return false
    }

    async login(user: IUser): Promise<{ accessToken: string }> {
        const payload = { email: user.email, id: user._id }
        return {
            accessToken: this.jwtService.sign(payload),
        }
    }
}
