import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { IRedisMessage } from 'app/common/interfaces';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(
    exception: RpcException,
    _: ArgumentsHost,
  ): Observable<IRedisMessage<any>> {
    return throwError(() => exception.getError());
  }
}
