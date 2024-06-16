import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkService {
  constructor(@InjectRepository(Work) private readonly workRepository: Repository<Work>,
  private readonly userService: UserService
){}
  async create(createWorkDto: CreateWorkDto) {
    const latestUser = await this.userService.findLatest()
    const user = latestUser[0]
    const newWork = {
      work: createWorkDto.work,
      amount: createWorkDto.amount,
      count: createWorkDto.count,
      user: {
        id: user.id
      }
    }
    return await this.workRepository.save(newWork)
  }

  async findAll() {
    const latestUser = await this.userService.findLatest()
    const user = latestUser[0]
    return await this.workRepository.find({
      where: {
        user: {id: user.id}
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} work`;
  }

  async update(id: number, updateWorkDto: UpdateWorkDto) {
    const work = await this.workRepository.findOne({
      where: {id}
    })
    if(!work) throw new NotFoundException('Work not found!')
    return await this.workRepository.update(id, updateWorkDto)
  }

  async remove(id: number) {
    const work = await this.workRepository.findOne({
      where: {id}
    })
    if(!work) throw new NotFoundException('Work not found!')
    return await this.workRepository.delete(id)
  }
}
