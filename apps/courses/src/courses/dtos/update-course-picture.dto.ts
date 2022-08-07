import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidatePromise } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { FileUploadDto } from '../../uploader/dtos';
import { CourseDto } from './course.dto';

@ArgsType()
export abstract class UpdateCoursePictureDto extends CourseDto {
  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public picture: Promise<FileUploadDto>;
}
