import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Availability,
  AvailabilityDocument,
} from './models/availability.model';
import {
  CreateAvailabilityDto,
  UpdateAvailabilityDto,
} from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name)
    private availabilityModel: Model<AvailabilityDocument>,
  ) {}

  async createAvailability(dto: CreateAvailabilityDto): Promise<Availability> {
    const newAvailability = new this.availabilityModel(dto);
    return newAvailability.save();
  }

  async getAllAvailabilities() {
    return this.availabilityModel.find({}).exec();
  }

  async findRoomAvailability(roomId: string): Promise<Availability[]> {
    return this.availabilityModel.find({ room: roomId }).exec();
  }

  async updateAvailabilityById(id: string, dto: UpdateAvailabilityDto) {
    return this.availabilityModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async deleteAvailability(id: string): Promise<Availability | null> {
    return this.availabilityModel.findByIdAndDelete(id).exec();
  }
}
