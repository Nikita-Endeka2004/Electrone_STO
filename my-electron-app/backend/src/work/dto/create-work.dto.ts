import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { UserData } from "src/user/entities/user.entity";

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
  user?: UserData
}
