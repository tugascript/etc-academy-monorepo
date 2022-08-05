import { ArgsType, Field } from '@nestjs/graphql';
import { RequestStatusEnum } from 'app/common/enums';
import { IsEnum, IsIn } from 'class-validator';

@ArgsType()
export abstract class GetInvitationsDto {
  @Field(() => RequestStatusEnum)
  @IsEnum(RequestStatusEnum)
  @IsIn([RequestStatusEnum.PENDING, RequestStatusEnum.REJECTED])
  public status: RequestStatusEnum;
}
