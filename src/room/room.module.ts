import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomSchema } from './models/room.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomController],
  exports: [MongooseModule],
  providers: [RoomService],
})
export class RoomModule {}
