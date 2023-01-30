import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({})); // DTO'larımızı doğrulamak için kullanıyoruz ordakı @IsString() gibi şeylerin geçerli olması için aslında
  await app.listen(5000);
}
bootstrap();
