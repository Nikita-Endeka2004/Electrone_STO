import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateWorkDto {
  @IsNotEmpty()
  work: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsNumber()
  count: number 

  @IsOptional()
  user?: User
}
