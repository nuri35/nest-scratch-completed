import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // hangı entity'lerin kullanılacağını belirtiyoruz bu modul ıcın
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
