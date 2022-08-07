import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidatePromise } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { FileUploadDto } from '../../uploader/dtos';
import { ResourceDto } from './resource.dto';

@ArgsType()
export abstract class UpdateResourceFileDto extends ResourceDto {
  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public file: Promise<FileUploadDto>;
}
