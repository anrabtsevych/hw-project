import { User } from 'src/users/models/user.model';
import { RoomCapacity } from '../types';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsEnum(RoomCapacity)
  name: RoomCapacity;

  @IsNumber()
  number: number;

  customer: User;

  @IsEnum(RoomCapacity)
  capacity: RoomCapacity;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsBoolean()
  available: boolean;

  @IsString({ each: true })
  photoUrl?: string;
}

export type UpdateRoomDto = Partial<CreateRoomDto>;
