import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidatePromise } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { FileUploadDto } from '../../uploader/dtos';
import { InstitutionDto } from './institution.dto';

@ArgsType()
export abstract class UpdateInstitutionPictureDto extends InstitutionDto {
  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public picture: Promise<FileUploadDto>;
}
