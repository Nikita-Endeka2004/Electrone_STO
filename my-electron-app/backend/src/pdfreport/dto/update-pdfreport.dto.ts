import { PartialType } from '@nestjs/mapped-types';
import { CreatePdfreportDto } from './create-pdfreport.dto';

export class UpdatePdfreportDto extends PartialType(CreatePdfreportDto) {}
