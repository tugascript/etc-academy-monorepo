import { RequestStatusEnum } from 'src/common/enums';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsIn, IsInt, IsNumber } from 'class-validator';

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
