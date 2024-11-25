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

  @Post('/book/:roomId')
  async bookRoom(@Param('roomId') roomId: string, @Body('date') date: Date) {
    return this.roomService.bookRoom(roomId, date);
  }

  @Get('/:id')
  getRoomById(@Param('id') id: string) {
    return this.roomService.findRoomById(id);
  }

  @Post('/new')
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

    return {
      message: 'Room has been deleted',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
