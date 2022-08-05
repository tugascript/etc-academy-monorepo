import { InstitutionDto } from './institution.dto';
import { ArgsType, Field } from '@nestjs/graphql';
import { ValidatePromise } from 'class-validator';
import { Type } from 'class-transformer';
import { FileUploadDto } from '@app/uploader/dtos';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@ArgsType()
export abstract class UpdateInstitutionPictureDto extends InstitutionDto {
  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public picture: Promise<FileUploadDto>;
}
