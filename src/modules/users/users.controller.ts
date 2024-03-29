import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptopr';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto) // ClassConstructor tip atadık {x:"vs",y:"blabla"}, string vs verdıgınde typescropt hata veriyor.
// @UseInterceptors(CurrentUserInterceptor) // bu interceptorı kullanmak ıcın bunu buraya yazmamız lazım ayrıca nest/common kutuphanesındekı UseInterceptors parametresınde kullanıyoruz onun ıcın oncesınde module ekledık. ama bunu user ıcın her controller'a ekleyemeyız. onun ıcın global yapmalyız. bunu user.module da yapacagız.
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // @Get('/whoami') // gerçek projede gerek yok
  // async whoami(@Session() session: any) {
  //   if (!session.userId) {
  //     return null;
  //   }
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard) //  ıstek atarken yukardan aşagı daha okurken servıce ıcerısıne erişim saglanmıyor eger user yok ise login olmadıysa yani.
  async whoami(@CurrentUser() user: User) {
    // bu CurrentUser olayını permıssın ıcınde kullancaz
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null; // userId null cekersen cooki-session da key ile  set-cookie olarak degıstıryor token'ı ve clıenta gonderıyor.
    return { message: 'Successfully signed out' };
  }

  @Post('signup')
  async createUserSign(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id; // sessıon objesıne userId koyduk bunu passport js ıle yaptıgımızda onun yapıldıgı yer var zaten sımdılık gostermek adına kendımız koyduk router'da

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('CreateUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get('admin/:id')
  async findUserAdmin(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
