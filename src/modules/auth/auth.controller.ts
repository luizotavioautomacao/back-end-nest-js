import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body);
        if (!user) return { error: 'Credenciais inválidas' };
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body: { username: string; email: string; password: string }) {
        // Implemente a lógica de registro aqui (validação, criação de usuário, etc.)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
