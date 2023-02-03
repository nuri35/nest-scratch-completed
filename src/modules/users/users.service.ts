import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // <-- typeorm metotları (create, save, find, findOne, update, delete
    return this.repo.save(user); // entity.relatedModel.save yanı user.relatedModel.save işlemnı burda degıl repo ıcınde cagırıdgımzı fonksıyon ıcınde yapıyor sanırsam.....
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  findOne(id: number) {
    //  where: { email: 'nurie487@gmail.com' } bunu burda yapmıcaz bız repodakı fonksıyonu cagırcaz o db ıslemı kendı ıcınde kendısı yyapacak unutma
    return this.repo.findOneBy({ id }); // burdada   throw new NotFoundException('User not found');  verdırebılrdık ama update fonskıyonu kullanıyor ya cakısmassın dıye controllerda kullan
  } // burda User entıty bılgısı donuyor ama password bılgısıde donuyor gızlı olması lazım onu yapcaz. @Exclude() kullancaz entıty ksıımında

  async update(id: number, attrs: Partial<User>) {
    // burda entıty'dekınler olsun dıye tıp ataması yapmamızın sebebı guncellemek ıcın yolladıgı dto'Da entıy'Dekı datadan 1 tane bıle eksık  yolladıysa dto'da kızması ıcın typescriptın boyle yaptık.....

    // eğer update ederken yukradakı fonksıyonu kullanalım nede olsa data buluyor bır endpoınt ıcın kullanılsada kullanabılrız. eger ordan donen data db'de varsa null donmesse yanı o datayıda .save() dersen bu save update yerıne geçer. fakat baktık findOne'dan donen db'de yok sonra eger burda create dıyıp ınstance yaratıp .save denılırsede kaydetme anlamına gelır kı onuda yukardakı create'de yapardın ordada bır var yok ıf kontrolu yapmalıyız aslında. neyse burdakı save update yeırne gececek yanı
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found'); // bunun ynaında kendınde exception filter yapabilirsin. error handling ıcın
    }
    Object.assign(user, attrs); // guncelleme. bulunan user assıgn metotuyla attrs ile gelen datayı guncellıyoruz.
    return this.repo.save(user); // en son guncelledıgın datayı repo'ya yolluyor orda save edıyor
  }

  remove(id: number) {
    // burdakı remove ve delete bıraz farklı  remove(entity) delete(id) or delete({email:"sasasa"}) gibidir. delete daha hızlıdır. ayrıca hooks not executed. ama bır entity fındone ıle bulup remove(entityyaptıgında)   const user = this.repo.create(createUserDto); gibi yanı hook are executed yapar hook executed yanı  user.entıty'de AfterUpdate sayesınde hangı ıd processed oldu  vs bakabılırsın takıp edbırlsın.
    return this.repo.delete(id);
  }
}
