import { Module, forwardRef } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomSchema } from './models/room.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { AvailabilitySchema } from 'src/availability/models/availability.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: 'Room', useFactory: () => RoomSchema },
      { name: 'Availability', useFactory: () => AvailabilitySchema },
    ]),
  ],
  controllers: [RoomController],
  exports: [MongooseModule],
  providers: [RoomService],
})
export class RoomModule {}
