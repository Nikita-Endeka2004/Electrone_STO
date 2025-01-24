import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EndProcesService } from './end-proces.service';
import { CreateEndProceDto } from './dto/create-end-proce.dto';
import { UpdateEndProceDto } from './dto/update-end-proce.dto';

@Controller('end-proces')
export class EndProcesController {
  constructor(private readonly endProcesService: EndProcesService) {}

  @Post()
  end(): string {
    return this.endProcesService.end();
  }

  @Get()
  test() {
    return this.endProcesService.test();
  }

}
