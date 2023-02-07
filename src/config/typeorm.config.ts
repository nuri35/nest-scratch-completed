import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'development') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true, //  entities: ['**/*.entity.js'], böylede yapabılrsın  dev ortmaında ayaga kalktıgında js'den okur compıle edıyor.
      };
    } else if (process.env.NODE_ENV === 'test') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true, //  entities: ['**/*.entity.ts'], böylede yapabılrsın testtıng yaparken ts uzantılıdır unutma
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
      };
    } else if (process.env.NODE_ENV === 'production') {
      const obj = {
        type: this.configService.get<any>('DB_TYPE'),
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        url: process.env.DATABASE_URL, // bu heroku ıcın ornek Heroku, çalışırken uygulamamıza bir ortam değişkeni atar. Bu değişkenin adı DATABASE_URL'dir. Bu değişkenin içinde veritabanı bağlantı bilgileri bulunur.
        autoLoadEntities: true,
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ), // So this property is going to make sure that all of our different migrations get ran when we are starting up our database
        ssl: {
          rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        },
      };
      return obj;
    } else {
      throw new Error('unknown environment');
    }
  }
}

// sımdı artık bıttı  bu. yarın sabah erkenden kalk  prod ifelse'ınde type'ına sqlite yaz dıgerlerını prod env'den okusun  url yeırnde database yaz  sımule etmıs olrusn bırnevı prod'da sqllite calıssın yanı  sonra  npm run start:dev 'De calıstır  sonra production'da build al calıstır. sonra dev'e geç bir kaç entity'ye column ekle mıgratıon generate et tekrardan sync: true oldugu ıcın dev'de sıkıntı yok sonra prod'Da build al calıstır hata vermesi lazım cunku o an migrationsRun: false olsun sonra mıgratıon guncell  zaten migrationsRun: true yap build al prod olarak calıstır mıgratıon guncel olan devreye gırdıgı ıcın dev'Dekı entity ile eşdeger olcak ve hata vermıcek bunu bır sabah sakın kafayla yap.
