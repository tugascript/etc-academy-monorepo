import { PaginationDto } from 'src/common/dtos';
import { RequestStatusEnum, RequestUserEnum } from 'src/common/enums';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

@ArgsType()
export abstract class FilterProfileRequestsDto extends PaginationDto {
  @Field(() => RequestStatusEnum, { nullable: true })
  @IsEnum(RequestStatusEnum)
  @IsOptional()
  public status?: RequestStatusEnum;

  @Field(() => RequestUserEnum)
  @IsEnum(RequestUserEnum)
  public userType: RequestUserEnum;
}
