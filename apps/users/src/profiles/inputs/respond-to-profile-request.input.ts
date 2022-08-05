import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsIn, IsInt, IsNumber, Min } from 'class-validator';
import { RequestStatusEnum } from '@app/common/enums';

@InputType('RespondToInvitationInput')
export abstract class RespondToProfileRequestInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public requestId: number;

  @Field(() => RequestStatusEnum)
  @IsEnum(RequestStatusEnum)
  @IsIn([RequestStatusEnum.ACCEPTED, RequestStatusEnum.REJECTED])
  public response: RequestStatusEnum;
}
