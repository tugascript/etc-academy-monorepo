import { TITLE_REGEX } from '@app/common/constants';
import { FileUploadDto } from '@app/uploader/dtos';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  ValidatePromise,
} from 'class-validator';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType('CreateResourceInput')
export class CreateResourceInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public courseId: number;

  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public lessonId: number;

  @Field(() => String)
  @IsString()
  @Matches(TITLE_REGEX)
  @Length(3, 150)
  public title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(3, 250)
  @IsOptional()
  public info?: string;

  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public file: Promise<FileUploadDto>;
}
