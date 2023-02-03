import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { classToPlain } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    console.log('I am running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        console.log('Run something before the response is sent out.');
        console.log('====================================');
        // Run something before the response is sent out. doalyısıla user conrollerdan en son sent yapacagız response'u burda userı serialize edecegiz. buraya en son gelmesı ıcın endpoınt uzerınde   @UseInterceptors(SerializeInterceptor) kullanıyoruz.
        console.log('I am running after the handler', data);

        return plainToClass(this.dto, data, { excludeExtraneousValues: true }); // false dersende password'uda vermektedır. excludeExtraneousValues demek exclude degerlerı harıc tut gıbı birşey.
      }),
    );
  }
}
