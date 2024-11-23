import { User } from 'src/users/models/user.model';
import { RoomCapacity } from '../types';

export class CreateRoomDto {
  id: string;
  name: string;
  customer: User;
  capacity: RoomCapacity;
  price: number;
  description: string;
  available: boolean;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateRoomDto = Partial<CreateRoomDto>;
