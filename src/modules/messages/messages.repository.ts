//uzun işlemler dosya okuma db veri iletişimi gibi durumlar
import { readFile, writeFile } from 'fs/promises';
import uuid4 from 'uuid4';

export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messagesDb.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll() {
    const contents = await readFile('messagesDb.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(content: string) {
    const contents = await readFile('messagesDb.json', 'utf-8');
    const messages = JSON.parse(contents);

    const generateId = uuid4();
    messages[generateId] = { generateId, content };
    await writeFile('messagesDb.json', JSON.stringify(messages));
  }
}
