import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './models/room.model';
import { Model, Types } from 'mongoose';
import { Availability } from 'src/availability/models/availability.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Availability.name)
    private availabilityModel: Model<Availability>,
  ) {}

  async bookRoom(roomId: string, date: Date): Promise<Availability> {
    const bookingDate = new Date(date);
    if (isNaN(bookingDate.getTime())) {
      throw new BadRequestException('Invalid date');
    }
    const room = await this.roomModel.findById(roomId).exec();
    if (!room) {
      throw new BadRequestException('Room not found');
    }
    const existingBooking = await this.availabilityModel.findOne({
      room: new Types.ObjectId(roomId),
      date: bookingDate,
    });

    if (existingBooking) {
      throw new BadRequestException('Room is not available for this date');
    }

    const newBooking = new this.availabilityModel({
      room: new Types.ObjectId(roomId),
      //customer: new Types.ObjectId(userId),
      date: bookingDate,
      isAvailable: false,
      price: room.price,
    });

    return newBooking.save();
  }

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
