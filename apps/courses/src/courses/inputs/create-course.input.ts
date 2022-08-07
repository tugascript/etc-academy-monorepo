import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  ValidatePromise,
} from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { NAME_REGEX } from '../../common/constants';
import { FileUploadDto } from '../../uploader/dtos';
import { CourseTypeEnum } from '../enums/course-type.enum';

@InputType('CreateCourseInput')
export class CreateCourseInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public institutionId: number;

  @Field(() => String)
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name: string;

  @Field(() => CourseTypeEnum)
  @IsEnum(CourseTypeEnum)
  public courseType: CourseTypeEnum;

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(1, 500)
  @IsOptional()
  public description?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @ValidatePromise()
  @Type(() => FileUploadDto)
  @IsOptional()
  public picture?: Promise<FileUploadDto>;
}
