//uzun işlemler dosya okuma db veri iletişimi gibi durumlar
import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    try {
      const contents = await readFile('messagesDb.json', 'utf-8');
      const messages = JSON.parse(contents);
      return messages[id];
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const contents = await readFile('messagesDb.json', 'utf-8');
      const messages = JSON.parse(contents);
      return messages;
    } catch (error) {
      throw error;
    }
  }

  async create(content: string) {
    try {
      const contents = await readFile('messagesDb.json', 'utf-8');

      const messages = JSON.parse(contents);

      const generateId = Math.floor(Math.random() * 999);
      messages[generateId] = { id: generateId, value: content };
      await writeFile('messagesDb.json', JSON.stringify(messages));
    } catch (err) {
      throw err;
    }
  }
}
