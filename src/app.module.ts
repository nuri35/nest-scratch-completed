import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { ReportsModule } from './modules/reports/reports.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './modules/reports/entity/report.entity';
import { User } from './modules/users/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // yada  ['database/entities/*{.js,.ts}'], boyle verebılrdık klasor olusturup ozaman onun path'ını verırdık
      synchronize: true,
    }),
    MessagesModule,
    ReportsModule,
    UsersModule,
  ], // burda providers ve controller yok cunku app.controllers ve app.services'ı yarattıydı sıldık onları gerek yok onlara
})
export class AppModule {}
