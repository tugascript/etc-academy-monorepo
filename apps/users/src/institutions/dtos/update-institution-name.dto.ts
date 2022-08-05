import { ArgsType, Field } from '@nestjs/graphql';
import { InstitutionDto } from './institution.dto';
import { IsString, Length, Matches } from 'class-validator';
import { NAME_REGEX } from '@app/common/constants';

@ArgsType()
export abstract class UpdateInstitutionNameDto extends InstitutionDto {
  @Field(() => String)
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name: string;
}
