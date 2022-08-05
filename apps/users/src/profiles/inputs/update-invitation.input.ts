import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsIn, IsInt, IsNumber } from 'class-validator';
import { RequestStatusEnum } from '@app/common/enums';

@InputType('UpdateInvitationInput')
export abstract class UpdateInvitationInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  public invitationId: number;

  @Field(() => RequestStatusEnum)
  @IsEnum(RequestStatusEnum)
  @IsIn([RequestStatusEnum.ACCEPTED])
  public response: RequestStatusEnum;
}
