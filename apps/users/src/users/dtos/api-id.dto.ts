import { IsString, IsUUID } from 'class-validator';
import { IApiId } from '../interfaces/api-id.interface';

export abstract class ApiIdDto implements IApiId {
  @IsString()
  @IsUUID('4')
  public apiId!: string;
}
