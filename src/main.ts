import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdfasdf'], // The  general string is going to be used to encrypt the information that is stored inside the cookie.
      // So the Keys array that we just put in is being used for this encryption step. sıfrelenen sessıon token ıcersıınde sadece userId tut kesınlıkle onuda sıgnupda vs ypabılrsın
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //eğer true olursa dto'da olmayan bır propertıes' verdıgımızde key value olarak ıste  backend'de body'den aldıgımızda onu o dto'Da tanımlanmayanı sıler. false olursa dto'DA olmayan ama clıent'dan bıze gelenıde alırız.
    }),
  ); // DTO'larımızı doğrulamak için kullanıyoruz ordakı @IsString() gibi şeylerin geçerli olması için aslında
  await app.listen(5000);
}
bootstrap();

// typeorm bır orm aracı sequilize ve mongoose gibi. en onemlı ozellıgı ornegın mongodb sqlite3  yada pg yukledıgınde nnpm i pg dıyerek daha sonra npm i typeorm dersın. bu typeorm dıger verıtabanları ıcıınde orm olarak kullanabılrısn
