import { Module } from '@nestjs/common';
import { PdfreportService } from './pdfreport.service';
import { PdfreportController } from './pdfreport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from 'src/work/entities/work.entity';
import { UserData } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { WorkModule } from 'src/work/work.module';
import { UserService } from 'src/user/user.service';
import { WorkService } from 'src/work/work.service';

@Module({
  imports: [TypeOrmModule.forFeature([Work, UserData]), UserModule, WorkModule],
  controllers: [PdfreportController],
  providers: [PdfreportService, UserService, WorkService],
})
export class PdfreportModule {}
