import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';
import { NAME_REGEX } from '../../common/constants';
import { InstitutionDto } from './institution.dto';

@ArgsType()
export abstract class UpdateInstitutionNameDto extends InstitutionDto {
  @Field(() => String)
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name: string;
}
