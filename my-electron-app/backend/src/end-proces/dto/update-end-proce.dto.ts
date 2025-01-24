import { PartialType } from '@nestjs/mapped-types';
import { CreateEndProceDto } from './create-end-proce.dto';

export class UpdateEndProceDto extends PartialType(CreateEndProceDto) {}
