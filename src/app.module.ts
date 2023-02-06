import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { ReportsModule } from './modules/reports/reports.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
const cookieSession = require('cookie-session');
import { APP_PIPE } from '@nestjs/core';
const dbConfig = require('../ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // default olarak .env dosyasını okur eger envFilePath'ı yazmazsak. ama biz bunu değiştirebiliriz. envFilePath belırterek  örneğin .env.development yazıyoruz. böylece .env.development dosyasını okur.
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService], //configservice'yi ejjecte ediyoruz.  seçtiğimiz dosyadan tüm yapılandırma bilgilerimize sahip olmamıza yarayan configServiceyi gitmesini ve bunu kullanmasını sağlıyoruz buluarak.
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: configService.get<string>('DB_NAME'),
    //       autoLoadEntities: true, // bunu true yapınca entity'leri otomatik yükler. ama biz bunu false yaparak entity'leri yüklemek için aşağıdaki gibi yaparız.
    //       // entities: [process.cwd() + './src/modules/**/entity/*.{js,ts}'], // yada  ['database/entities/*{.js,.ts}'], boyle verebılrdık klasor olusturup ozaman onun path'ını verırdık
    //       synchronize: true,
    //     };
    //   },
    // }),
    MessagesModule,
    ReportsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, //eğer true olursa dto'da olmayan bır propertıes' verdıgımızde key value olarak ıste  backend'de body'den aldıgımızda onu o dto'Da tanımlanmayanı sıler. false olursa dto'DA olmayan ama clıent'dan bıze gelenıde alırız.
      }), // DTO'larımızı doğrulamak için kullanıyoruz ordakı @IsString() gibi şeylerin geçerli olması için aslında
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_KEY')], // The  general string is going to be used to encrypt the information that is stored inside the cookie.
          // So the Keys array that we just put in is being used for this encryption step. sıfrelenen sessıon token ıcersıınde sadece userId tut kesınlıkle onuda sıgnupda vs ypabılrsın
        }),
      )
      .forRoutes('*');
  }
}
