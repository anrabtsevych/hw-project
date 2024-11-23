import { Injectable } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './models/room.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async createRoom(dto: CreateRoomDto): Promise<Room> {
    const newRoom = new this.roomModel(dto);
    return newRoom.save();
  }

  async findAllRooms() {
    return this.roomModel.find().exec();
  }

  async findRoomById(id: string): Promise<Room | null> {
    if (!id) {
      throw new Error('Room with this ID was not found');
    }
    const room = await this.roomModel.findById(id).exec();
    return room;
  }

  async updateRoom(id: string, dto: UpdateRoomDto): Promise<Room | null> {
    if (!id) {
      throw new Error('Room with this ID was not found');
    }
    return this.roomModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  async deleteRoom(id: string): Promise<Room | null> {
    if (!id) {
      throw new Error('Room with this ID was not found');
    }
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
