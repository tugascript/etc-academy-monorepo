import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';
import { TITLE_REGEX } from '../../common/constants';
import { ResourceDto } from './resource.dto';

@ArgsType()
export abstract class UpdateResourceTitleDto extends ResourceDto {
  @Field(() => String)
  @IsString()
  @Matches(TITLE_REGEX)
  @Length(3, 150)
  public title: string;
}
