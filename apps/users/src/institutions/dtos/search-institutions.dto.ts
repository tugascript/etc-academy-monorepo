import { SearchDto } from 'app/common/dtos';
import { ArgsType, Field } from '@nestjs/graphql';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { CountryCodesEnum } from '../../addresses/enums/contry-codes.enum';

@ArgsType()
export abstract class SearchInstitutionsDto extends SearchDto {
  @Field(() => InstitutionTypeEnum, { nullable: true })
  @IsEnum(InstitutionTypeEnum)
  @IsOptional()
  public institutionType?: InstitutionTypeEnum;

  @Field(() => CountryCodesEnum, { nullable: true })
  @IsEnum(CountryCodesEnum)
  @IsOptional()
  public country?: CountryCodesEnum;
}
