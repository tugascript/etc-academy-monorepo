import { RequestStatusEnum } from 'src/common/enums';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';

@ArgsType()
export abstract class GetInvitationsDto {
  @Field(() => RequestStatusEnum)
  @IsEnum(RequestStatusEnum)
  @IsIn([RequestStatusEnum.PENDING, RequestStatusEnum.REJECTED])
  public status: RequestStatusEnum;
}
