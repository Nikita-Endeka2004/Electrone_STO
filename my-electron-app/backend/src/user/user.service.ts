import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserData } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserData) private readonly userRepository: Repository<UserData>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save({
      vin: createUserDto.vin,
      car_number: createUserDto.car_number,
      fio: createUserDto.fio,
      date: new Date()
    })
    return user
  }

  async findLatest() {
    const latestUser = this.userRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    return latestUser;
  }

}
