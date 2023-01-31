import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { ReportsModule } from './modules/reports/reports.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagesModule,
    ReportsModule,
    UsersModule,
  ], // burda providers ve controller yok cunku app.controllers ve app.services'ı yarattıydı sıldık onları gerek yok onlara
})
export class AppModule {}
