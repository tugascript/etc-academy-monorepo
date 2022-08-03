import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidatePromise } from 'class-validator';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUploadDto } from 'app/uploader/dtos';

@ArgsType()
export abstract class ProfilePictureDto {
  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public picture: Promise<FileUploadDto>;
}
