import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { ResourceDto } from './resource.dto';

@ArgsType()
export abstract class UpdateResourceInfoDto extends ResourceDto {
  @Field(() => String)
  @IsString()
  @Length(3, 250)
  public info: string;
}
