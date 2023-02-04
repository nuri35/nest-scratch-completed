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

  @Post() // CreateMessageDto diye bir class'ı tip ataması yaptık. content: string imiş ama bir ise yaramaz sonra o dto'da class validator ile @IsString() dedik. yine işe yarmaz.  @IsString() bunun ıse yaraması ıcın app.module.ts de app.useGlobalPipes(new ValidationPipe({})); dedik. artık işe yarıyor
  async create(@Body() createMessageDto: CreateMessageDto) {
    console.log(createMessageDto);
  }

  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const messVal = await this.messagesService.findOne(id); //burda awaıt koyalım cunku if ile bir messVal degerını kontrol edıcez promise bekle bu uzun suren işlemın cevabını if 'de işlem yapıcaz dıyoruz

    if (!messVal) {
      throw new NotFoundException('Message not found');
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
