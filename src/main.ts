import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({})); // DTO'larımızı doğrulamak için kullanıyoruz ordakı @IsString() gibi şeylerin geçerli olması için aslında
  await app.listen(5000);
}
bootstrap();

// typeorm bır orm aracı sequilize ve mongoose gibi. en onemlı ozellıgı ornegın mongodb sqlite3  yada pg yukledıgınde nnpm i pg dıyerek daha sonra npm i typeorm dersın. bu typeorm dıger verıtabanları ıcıınde orm olarak kullanabılrısn
