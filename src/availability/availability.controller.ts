import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Controller('availability')
export class AvailabilityController {
  @Get('/all')
  getAll() {
    return 'All availability';
  }

  @Get('/date/:date')
  getByDate() {
    return 'Availability by date';
  }

  @Get('roomId/:roomID')
  getByRoomId(@Param('roomID') roomID: string) {
    return 'Availability by room ID';
  }

  @Post()
  create(@Body() dto: CreateAvailabilityDto) {
    return 'Create availability';
  }

  @Put('/:roomId')
  updateAvailability(@Param('roomId') roomId: string) {
    return 'Update availability';
  }

  @Delete('/:id')
  delete() {
    return 'Delete availability';
  }
}
