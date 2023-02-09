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
      return {
        type: 'sqlite',
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: 'prod.sqlite', // bu heroku ıcın ornek Heroku, çalışırken uygulamamıza bir ortam değişkeni atar. Bu değişkenin adı DATABASE_URL'dir. Bu değişkenin içinde veritabanı bağlantı bilgileri bulunur.
        autoLoadEntities: true,
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
        // So this property is going to make sure that all of our different migrations get ran when we are starting up our database
        // ssl: {
        //   rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        // },
      };
    } else {
      throw new Error('unknown environment');
    }
  }
}
