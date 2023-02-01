import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { ReportsModule } from './modules/reports/reports.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './modules/reports/entity/report.entity';
import { User } from './modules/users/entity/user.entity';

console.log(process.cwd());
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true, // bunu true yapınca entity'leri otomatik yükler. ama biz bunu false yaparak entity'leri yüklemek için aşağıdaki gibi yaparız.
      // entities: [process.cwd() + './src/modules/**/entity/*.{js,ts}'], // yada  ['database/entities/*{.js,.ts}'], boyle verebılrdık klasor olusturup ozaman onun path'ını verırdık
      synchronize: true, // dev envrioment için true, production için false olmalıdır.
    }),
    MessagesModule,
    ReportsModule,
    UsersModule,
  ], // burda providers ve controller yok cunku app.controllers ve app.services'ı yarattıydı sıldık onları gerek yok onlara
})
export class AppModule {}
