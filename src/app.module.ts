import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MinioS3Module } from './modules/minio-s3/minio-s3.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/nest'), 
    // rodar pelo host => mongodb://localhost/nest 
    // rodar pelo docker => mongodb://mongo/nest 
    UserModule,
    AuthModule,
    BankAccountModule,
    PaymentModule,
    MinioS3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
