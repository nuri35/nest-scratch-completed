import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  await app.listen(5000);
}
bootstrap();

// typeorm bır orm aracı sequilize ve mongoose gibi. en onemlı ozellıgı ornegın mongodb sqlite3  yada pg yukledıgınde nnpm i pg dıyerek daha sonra npm i typeorm dersın. bu typeorm dıger verıtabanları ıcıınde orm olarak kullanabılrısn
