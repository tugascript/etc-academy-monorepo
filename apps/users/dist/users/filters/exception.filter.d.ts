import { IRedisMessage } from 'src/common/interfaces';
import { ArgumentsHost, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class ExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, _: ArgumentsHost): Observable<IRedisMessage<any>>;
}
