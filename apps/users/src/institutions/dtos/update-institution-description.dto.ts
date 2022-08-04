import { ArgsType, Field } from '@nestjs/graphql';
import { InstitutionDto } from './institution.dto';
import { IsString, Length } from 'class-validator';

@ArgsType()
export abstract class UpdateInstitutionDescriptionDto extends InstitutionDto {
  @Field(() => String)
  @IsString()
  @Length(1, 500)
  public description: string;
}
