import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
  ValidatePromise,
} from 'class-validator';
import { GraphQLUpload } from 'graphql-upload';
import { InitialAddressInput } from '../../addresses/inputs/initial-address.input';
import { NAME_REGEX } from '../../common/constants';
import { FileUploadDto } from '../../uploader/dtos';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';

@InputType('CreateInstitutionInput')
export class CreateInstitutionInput {
  @Field(() => String)
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name: string;

  @Field(() => InstitutionTypeEnum)
  @IsEnum(InstitutionTypeEnum)
  public institutionType: InstitutionTypeEnum;

  @Field(() => GraphQLUpload)
  @ValidatePromise()
  @Type(() => FileUploadDto)
  public picture: Promise<FileUploadDto>;

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(1, 500)
  @IsOptional()
  public description?: string;

  @Field(() => String)
  @IsString()
  @Length(3, 30)
  public vatNumber: string;

  @Field(() => InitialAddressInput)
  @ValidateNested()
  @Type(() => InitialAddressInput)
  public address: InitialAddressInput;
}
