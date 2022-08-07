import { IRedisMessage } from '../interfaces';
export declare class RedisMessageDto<T> implements IRedisMessage<T> {
    id: string;
    status: 'error' | 'success';
    message: T;
    constructor(message: T);
}
