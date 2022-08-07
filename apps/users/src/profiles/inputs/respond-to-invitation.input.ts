import { RequestStatusEnum } from 'src/common/enums';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsIn, IsJWT, IsString } from 'class-validator';

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
