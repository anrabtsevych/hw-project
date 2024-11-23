import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { ROOM_NOT_FOUND } from './room.constants';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('/all')
  getAllRooms() {
    return this.roomService.findAllRooms();
  }
  @Get('/search')
  searchRoomsByKeyword(@Query('keyword') keyword: string) {
    return;
  }

  @Get('/availability/:id')
  getRoomAvailability(@Param('id') id: string) {
    //TODO: I will add an aggregation query here later
    return;
  }

  @Get('/:id')
  getRoomByName(@Param('id') id: string) {
    return this.roomService.findRoomById(id);
  }

  @Post()
  createRoom(@Body() dto: CreateRoomDto) {
    return this.roomService.createRoom(dto);
  }

  @Put('/update/:id')
  updateRoom(@Param('id') id: string, dto: UpdateRoomDto) {
    return this.roomService.updateRoom(id, dto);
  }

  @Delete('/:id')
  async deleteRoom(@Param('id') id: string) {
    const deletedRoom = await this.roomService.deleteRoom(id);
    if (!deletedRoom) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deletedRoom;
  }
}
