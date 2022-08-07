import {
  IBucketOptions,
  IBucketOptionsFactory,
} from '@app/uploader/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploaderConfig implements IBucketOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createBucketOptions(): IBucketOptions {
    return this.configService.get<IBucketOptions>('bucketConfig');
  }
}
