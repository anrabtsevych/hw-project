import { Module, forwardRef } from '@nestjs/common';
import { AvailabilityController } from './availability.controller';
import { Room, RoomSchema } from 'src/room/models/room.model';
import { Availability, AvailabilitySchema } from './models/availability.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailabilityService } from './availability.service';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Availability.name, useFactory: () => AvailabilitySchema },
      { name: Room.name, useFactory: () => RoomSchema },
    ]),
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  exports: [AvailabilityService, MongooseModule],
})
export class AvailabilityModule {}
