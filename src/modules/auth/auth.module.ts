import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { jwtConstants } from './jwt.constants'
import { BcryptService } from './bcrypt.service'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, BcryptService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule { }