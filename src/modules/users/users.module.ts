import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // hangı entity'lerin kullanılacağını belirtiyoruz bu modul ıcın
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
})
export class UsersModule {}

// auth servıce'de ınjectable oda onun ıcındede user servıceden bır şeylerk ullanıyoruz depency injection aslında. ve ayrıca provıders kısmınada koyacagız burada. buyuk projelerde  user controllerda sıgnup dıye bır endpoıntte this.userService.sıgnup dıye servıcede fonkssıyon olustursak user.servicede cok fonksıyon bırıkecek onun yerıne auth servıce dıye birşey yarat yanı şuankı yaptıgımız yapı seklınde kullan. sıngup endpoıntı ıcınde yanı user controllerda this.usersService.sıgnup(x); yerın this.authService.sıgnup(x); diyoruz.
