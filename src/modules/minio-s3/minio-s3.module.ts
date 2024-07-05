import { Module } from '@nestjs/common';
import { MinioS3Service } from './minio-s3.service';
import { MinioS3Controller } from './minio-s3.controller';

@Module({
  providers: [MinioS3Service],
  controllers: [MinioS3Controller]
})
export class MinioS3Module {}
