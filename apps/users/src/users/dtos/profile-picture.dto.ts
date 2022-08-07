import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidatePromise } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { FileUploadDto } from 'src/uploader/dtos';

@ArgsType()
export abstract class ProfilePictureDto {
  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public picture: Promise<FileUploadDto>;
}
