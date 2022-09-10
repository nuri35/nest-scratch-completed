//uzun işlemler dosya okuma db veri iletişimi gibi durumlar
import { readFile,writeFile } from "fs/promises";
export class MessagesRepository {
  async findOne(id: string) {}

  async findAll() {}

  async create(message: string) {}
}
