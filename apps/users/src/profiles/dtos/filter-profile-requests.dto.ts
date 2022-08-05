import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationDto } from '@app/common/dtos';
import { RequestStatusEnum, RequestUserEnum } from '@app/common/enums';
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
