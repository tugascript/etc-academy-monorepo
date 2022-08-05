import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsIn, IsJWT, IsString } from 'class-validator';
import { RequestStatusEnum } from '@app/common/enums';

@InputType('RespondToInvitationInput')
export abstract class RespondToInvitationInput {
  @Field(() => String)
  @IsString()
  @IsJWT()
  public token: string;

  @Field(() => RequestStatusEnum)
  @IsEnum(RequestStatusEnum)
  @IsIn([RequestStatusEnum.ACCEPTED, RequestStatusEnum.REJECTED])
  public response: RequestStatusEnum;
}
