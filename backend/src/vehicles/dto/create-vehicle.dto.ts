import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  licensePlate: string;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;
}
