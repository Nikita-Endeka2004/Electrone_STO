import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save({
      vin: createUserDto.vin,
      car_number: createUserDto.car_number,
      fio: createUserDto.fio
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
