import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
export class CreateAvailabilityDto {
  @IsNotEmpty()
  roomId: string;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  isAvailable: boolean;

  @IsNumber()
  @IsPositive()
  price: number;
}

export type UpdateAvailabilityDto = Partial<CreateAvailabilityDto>;
