import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';
import { InstitutionDto } from '../../institutions/dtos/institution.dto';

@ArgsType()
export abstract class AddressDto extends InstitutionDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public addressId: number;
}
