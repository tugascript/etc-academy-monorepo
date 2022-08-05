import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';

@ArgsType()
export abstract class UserDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public userId: number;
}
