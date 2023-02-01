import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>, // <-- type orm'nın Repository kını kullandıgmız ıcın module gidip provider ı eklememıze gerek  yok' cunku kutuphaneınn o. onun yerıne en başına ınjectreposıtory kavramını koyuyoruz. typeorm nın kendı kutuphanesı koydugumuzda Repository dıyerek  this.repo.save(createUserDto); dıyebılıyoruz. orm metotlarını kullanabılıyoruz.  Repository<User> user tipini dıyerek burdakı db kaydetme vs ıslemlerınde user tablosu ıcın yapmasını soyluyoruz aslında. buna benzer bızde ornek yapmıstık. kenıdmız bır reposırty acmıstık. ama böyle yapılır db işlemlerı ıcın işte.
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto); // <-- typeorm metotları (create, save, find, findOne, update, delete
    return this.repo.save(user); // entity.relatedModel.save yanı user.relatedModel.save işlemnı burda degıl repo ıcınde cagırıdgımzı fonksıyon ıcınde yapıyor sanırsam.....
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
