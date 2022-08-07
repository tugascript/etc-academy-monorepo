import { IRedisMessage } from 'src/common/interfaces';
import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(
    exception: RpcException,
    _: ArgumentsHost,
  ): Observable<IRedisMessage<any>> {
    return throwError(() => exception.getError());
  }
}
