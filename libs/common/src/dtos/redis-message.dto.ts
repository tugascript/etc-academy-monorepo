import { IRedisMessage } from 'app/common/interfaces';
import { v4 as uuidV4 } from 'uuid';

export class RedisMessageDto<T> implements IRedisMessage<T> {
  public id: string;
  public status: 'error' | 'success';
  public message: T;

  constructor(message: T) {
    this.status = 'success';
    this.id = uuidV4();
    this.message = message;
  }
}
