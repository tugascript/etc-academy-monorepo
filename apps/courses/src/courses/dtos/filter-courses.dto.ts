import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';
import { SearchDto } from '../../common/dtos';

@ArgsType()
export abstract class FilterCoursesDto extends SearchDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public institutionId: number;
}
