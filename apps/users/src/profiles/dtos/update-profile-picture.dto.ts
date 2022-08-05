import { ArgsType, Field } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { ValidatePromise } from 'class-validator';
import { Type } from 'class-transformer';
import { FileUploadDto } from '@app/uploader/dtos';
import { ProfileDto } from './profile.dto';

@ArgsType()
export abstract class UpdateProfilePictureDto extends ProfileDto {
  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public picture: Promise<FileUploadDto>;
}
