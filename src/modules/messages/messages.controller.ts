import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const messVal = await this.messagesService.findOne(id); //burda awaıt koyalım cunku if ile bir messVal degerını kontrol edıcez promise bekle bu uzun suren işlemın cevabını if 'de işlem yapıcaz dıyoruz

    if (!messVal) {
      throw new NotFoundException();
    }
    return messVal;
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
