import { SLUG_REGEX } from '@app/common/constants';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';
import { InstitutionDto } from '../../institutions/dtos/institution.dto';

@ArgsType()
export abstract class ProfileSlugDto extends InstitutionDto {
  @Field(() => String)
  @IsString()
  @Matches(SLUG_REGEX)
  @Length(3, 110)
  public slug: string;
}
