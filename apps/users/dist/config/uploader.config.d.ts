import { ConfigService } from '@nestjs/config';
import { IBucketOptions, IBucketOptionsFactory } from 'src/uploader/interfaces';
export declare class UploaderConfig implements IBucketOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createBucketOptions(): IBucketOptions;
}
