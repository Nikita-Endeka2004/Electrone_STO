import { IsNotEmpty } from "class-validator";


export class CreateUserDto {
  @IsNotEmpty()
  vin: string

  @IsNotEmpty()
  car_number: string

  @IsNotEmpty()
  fio: string
}
