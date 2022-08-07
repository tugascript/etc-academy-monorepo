import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';
import { OrderDto } from '../../common/dtos';

@ArgsType()
export abstract class FilterProfilesDto extends OrderDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public courseId: number;
}
