export interface IRedisMessage<T> {
    status: 'error' | 'success';
    id: string;
    message: T;
}
