import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('user_data')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Get()
  findAllRecentUsers(){
    return this.userService.findAllRecentUsers();
  }

  @Get('latest')
  findLatest() {
    return this.userService.findLatest();
  }


}
