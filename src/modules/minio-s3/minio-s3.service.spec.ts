import { Test, TestingModule } from '@nestjs/testing';
import { MinioS3Service } from './minio-s3.service';

describe('MinioS3Service', () => {
  let service: MinioS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinioS3Service],
    }).compile();

    service = module.get<MinioS3Service>(MinioS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
