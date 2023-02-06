import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) return false;
    return request.currentUser.admin; // eger request.currentUser.admin degerı true ıse true doner false ıse hata verir.
  }
}
