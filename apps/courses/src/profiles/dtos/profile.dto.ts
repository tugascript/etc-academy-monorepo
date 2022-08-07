import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';
import { CourseDto } from '../../courses/dtos/course.dto';

@ArgsType()
export abstract class ProfileDto extends CourseDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public profileId: number;
}
