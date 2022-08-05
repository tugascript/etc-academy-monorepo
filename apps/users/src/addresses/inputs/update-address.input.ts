import { ADDRESS_REGEX, NAME_REGEX } from '@app/common/constants';
import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { CountryCodesEnum } from '../enums/contry-codes.enum';

@InputType('UpdateAddressInput')
export abstract class UpdateAddressInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public institutionId: number;

  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public addressId: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @Matches(ADDRESS_REGEX, { message: "Address can't have symbols." })
  @Length(3, 150)
  @IsOptional()
  public address?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Matches(ADDRESS_REGEX, { message: "Address can't have symbols." })
  @Length(1, 150)
  @IsOptional()
  public address2?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Matches(NAME_REGEX, { message: 'City has to be a valid name.' })
  @Length(3, 100)
  @IsOptional()
  public city: string;

  @Field(() => CountryCodesEnum, { nullable: true })
  @IsEnum(CountryCodesEnum)
  @IsOptional()
  public country: CountryCodesEnum;

  @Field(() => String, { nullable: true })
  @IsString()
  @Matches(NAME_REGEX)
  @Length(2, 100)
  @IsOptional()
  public state: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(3, 30)
  @IsOptional()
  public zipCode: string;
}
