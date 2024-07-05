import { Test, TestingModule } from '@nestjs/testing';
import { MinioS3Controller } from './minio-s3.controller';

describe('MinioS3Controller', () => {
  let controller: MinioS3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinioS3Controller],
    }).compile();

    controller = module.get<MinioS3Controller>(MinioS3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
