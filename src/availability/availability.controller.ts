import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateAvailabilityDto,
  UpdateAvailabilityDto,
} from './dto/create-availability.dto';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get('/all')
  getAll() {
    return this.availabilityService.getAllAvailabilities();
  }

  @Post('/new')
  create(@Body() dto: CreateAvailabilityDto) {
    try {
      const newAvailability = this.availabilityService.createAvailability(dto);
      return newAvailability;
    } catch (err) {
      console.log('error', err);
      return err;
    }
  }

  @Put('/:id')
  async updateAvailability(
    @Param('id') id: string,
    @Body()
    dto: UpdateAvailabilityDto,
  ) {
    return this.availabilityService.updateAvailabilityById(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.availabilityService.deleteAvailability(id);
  }
}
