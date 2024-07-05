import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express'; 

@Injectable()
export class MinioS3Service {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      endpoint: this.configService.get<string>('MINIO_ENDPOINT'),
      accessKeyId: this.configService.get<string>('MINIO_ROOT_USER'),
      secretAccessKey: this.configService.get<string>('MINIO_ROOT_PASSWORD'),
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuid()}-${file.originalname}`;
    const params = {
      Bucket: this.configService.get<string>('MINIO_BUCKET_NAME'),
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const data = await this.s3.upload(params).promise();
    return data.Location;
  }
}
