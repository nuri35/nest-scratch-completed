import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session?.userId;
  } // canActivate fonksıyonunda eger null false vs donerse işte gelen istek devam etmıyor 403 hatası verıyor.
}
