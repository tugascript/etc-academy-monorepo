import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { InstitutionDto } from '../../institutions/dtos/institution.dto';
import { AddressTypeEnum } from '../enums/address-type.enum';

@ArgsType()
export abstract class AddressTypeDto extends InstitutionDto {
  @Field(() => AddressTypeEnum)
  @IsEnum(AddressTypeEnum)
  public addressType: AddressTypeEnum;
}
