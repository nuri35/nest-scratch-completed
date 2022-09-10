import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from 'src/modules/messages/messages.repository';

@Module({
  imports: [
    //entity module import or other service's module you can do
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository], //kendı servısı gııbı dusun reposıtyory buraya koyduk
})
export class MessagesModule {}
