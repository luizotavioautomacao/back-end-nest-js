import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { MinioS3Service } from './minio-s3.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      storage: multerS3({
        s3: new AWS.S3({
          endpoint: process.env.MINIO_ENDPOINT,
          accessKeyId: process.env.MINIO_ACCESS_KEY,
          secretAccessKey: process.env.MINIO_SECRET_KEY,
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        }),
        bucket: process.env.MINIO_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(null, `${uuid()}-${file.originalname}`);
        },
      }),
    }),
  ],
  providers: [MinioS3Service],
  exports: [MinioS3Service],
})
export class MinioS3Module {}
