import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { IBucketData, IBucketOptions } from './interfaces';
import {
  BUCKET_OPTIONS,
  MAX_WIDTH,
  QUALITY_ARRAY,
} from 'app/uploader/constants';
import sharp from 'sharp';
import { Readable } from 'stream';
import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';
import { FileUploadDto } from './dtos';

@Injectable()
export class UploaderService {
  private readonly client: S3Client;
  private readonly bucketData: IBucketData;
  private readonly bucketNamespace: string;
  private readonly baseFolder: string;

  constructor(@Inject(BUCKET_OPTIONS) options: IBucketOptions) {
    const { name, region, credentials, uuid, folder, url } = options;
    this.bucketNamespace = uuid;
    this.baseFolder = folder;
    this.bucketData = { name, url };
    this.client = new S3Client({
      region,
      credentials,
      forcePathStyle: false,
      endpoint: url,
    });
  }

  /**
   * Upload Image
   *
   * Converts an image to jpeg and uploads it to the bucket
   */
  public async uploadImage(
    userId: number,
    file: Promise<FileUploadDto>,
    ratio?: number,
  ): Promise<string> {
    const { mimetype, createReadStream } = await file;

    const imageType = this.validateImage(mimetype);
    if (!imageType)
      throw new BadRequestException('Please upload a valid image');

    let buffer = await this.throwInternalError(
      this.streamToBuffer(createReadStream()),
    );
    buffer = await this.compressImage(buffer, ratio);

    return await this.uploadFile(userId, buffer, '.jpg');
  }

  /**
   * Delete File
   *
   * Takes an url and deletes the file from the bucket
   */
  public async deleteFile(url: string): Promise<void> {
    if (!this.validateBucketUrl(url))
      throw new BadRequestException('Url not valid');
    const keyArr = url.split('.com/');

    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketData.name,
          Key: keyArr[1],
        }),
      );
    } catch (_) {}
  }

  private validateImage(mimetype: string): string | false {
    const val = mimetype.split('/');
    if (val[0] !== 'image') return false;

    return val[1] ?? false;
  }

  private validateBucketUrl(url: string): boolean {
    return url.includes(this.bucketData.url.substring(8));
  }

  private async compressImage(buffer: Buffer, ratio?: number): Promise<Buffer> {
    let compressBuffer: sharp.Sharp | Buffer = sharp(buffer).jpeg({
      mozjpeg: true,
      chromaSubsampling: '4:4:4',
    });

    if (ratio)
      compressBuffer.resize({
        width: MAX_WIDTH,
        height: Math.round(MAX_WIDTH * ratio),
        fit: 'cover',
      });

    compressBuffer = await compressBuffer.toBuffer();

    if (compressBuffer.length > 256000) {
      for (let i = 0; i < QUALITY_ARRAY.length; i++) {
        const quality = QUALITY_ARRAY[i];
        const smallerBuffer = await sharp(compressBuffer)
          .jpeg({
            quality,
            chromaSubsampling: '4:4:4',
          })
          .toBuffer();

        if (smallerBuffer.length <= 256000 || quality === 10) {
          compressBuffer = smallerBuffer;
          break;
        }
      }
    }

    return compressBuffer;
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }

  private async uploadFile(
    userId: number,
    fileBuffer: Buffer,
    fileExt: string,
  ): Promise<string> {
    const folderId = uuidV5(userId.toString(), this.bucketNamespace);
    const key = `${this.baseFolder}/${folderId}/${uuidV4()}.${fileExt}`;

    await this.throwInternalError(
      this.client.send(
        new PutObjectCommand({
          Bucket: this.bucketData.name,
          Body: fileBuffer,
          Key: key,
          ACL: 'public-read',
        }),
      ),
    );

    return this.bucketData.url + '/' + key;
  }

  private async throwInternalError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
