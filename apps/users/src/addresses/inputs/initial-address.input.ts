import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ADDRESS_REGEX, NAME_REGEX } from 'app/common/constants';
import { CountryCodesEnum } from '../enums/contry-codes.enum';

@InputType('InitialAddressInput')
export abstract class InitialAddressInput {
  @Field(() => String)
  @IsString()
  @Matches(ADDRESS_REGEX, { message: "Address can't have symbols." })
  @Length(3, 150)
  public address: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Matches(ADDRESS_REGEX, { message: "Address can't have symbols." })
  @Length(1, 150)
  @IsOptional()
  public address2?: string;

  @Field(() => String)
  @IsString()
  @Matches(NAME_REGEX, { message: 'City has to be a valid name.' })
  @Length(3, 100)
  public city: string;

  @Field(() => CountryCodesEnum)
  @IsEnum(CountryCodesEnum)
  public country: CountryCodesEnum;

  @Field(() => String)
  @IsString()
  @Matches(NAME_REGEX)
  @Length(2, 100)
  public state: string;

  @Field(() => String)
  @IsString()
  @Length(3, 30)
  public zipCode: string;
}
