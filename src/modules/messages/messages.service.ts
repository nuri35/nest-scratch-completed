import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(public readonly messageRepo: MessagesRepository) {}

  create(createMessageDto: CreateMessageDto) {
    return this.messageRepo.create(createMessageDto.content);
  }

  findAll() {
    return this.messageRepo.findAll();
  }

  findAllexel() {
    return `This action returns all messages exel`;
  }

  findOne(id: string) {
    return this.messageRepo.findOne(id);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
