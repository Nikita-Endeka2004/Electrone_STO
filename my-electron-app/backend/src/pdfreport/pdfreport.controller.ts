import { Controller, Post, HttpCode, HttpStatus, Get, Query, Body } from '@nestjs/common';
import { PdfreportService } from './pdfreport.service';

@Controller('pdfreport')
export class PdfreportController {
  constructor(private readonly pdfreportService: PdfreportService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT) 
  async create(): Promise<void> {
    await this.pdfreportService.create();
  }

  @Get()
  async findAll(@Query('search') searchTerm: string) {
    try {
      const files = await this.pdfreportService.findAll(searchTerm || '');
      return files;
    } catch (error) {
      return { message: `Error: ${error.message}` };
    }
  }
  
  @Post('open')
  async openPdf(@Body('fileName') fileName: string): Promise<void> {
    await this.pdfreportService.openPdfByName(fileName);
  }
}