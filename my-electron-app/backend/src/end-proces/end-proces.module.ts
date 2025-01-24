import { Module } from '@nestjs/common';
import { EndProcesService } from './end-proces.service';
import { EndProcesController } from './end-proces.controller';

@Module({
  controllers: [EndProcesController],
  providers: [EndProcesService],
})
export class EndProcesModule {}
