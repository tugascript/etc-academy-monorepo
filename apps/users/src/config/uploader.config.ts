import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IBucketOptions, IBucketOptionsFactory } from 'src/uploader/interfaces';

@Injectable()
export class UploaderConfig implements IBucketOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createBucketOptions(): IBucketOptions {
    return this.configService.get<IBucketOptions>('bucketConfig');
  }
}
