import { ArgsType, Field } from '@nestjs/graphql';
import { IsJWT, IsString } from 'class-validator';

@ArgsType()
export abstract class TokenDto {
  @Field(() => String)
  @IsString()
  @IsJWT()
  public token: string;
}
