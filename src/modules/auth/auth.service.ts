import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.interface';


interface LoginParams {
    email: string
    password: string
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(user: LoginParams): Promise<IUser> {
        const getUser = await this.userService.getOneUserByQuery({ email: user.email });
        if (getUser && getUser.password === user.password) {
            return getUser;
        }
        return null;
    }

    async login(user: IUser): Promise<{ accessToken: string }> {
        const payload = { email: user.email, id: user._id }
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
