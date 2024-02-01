import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ReservationEntity } from './reservation.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/createReservation.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Reservation successfully created' })
  async createReservation(@Body() createReservationDto: CreateReservationDto): Promise<ReservationEntity> {
    return await this.reservationService.createReservation(createReservationDto);
  }


  @Get(':id')
  @ApiResponse({ status: 200, description: 'Reservation found', type: ReservationEntity })
  @ApiResponse({ status: 404, description: 'Reservation not found' })
  async getReservationById(@Param('id') reservationId: number): Promise<ReservationEntity | undefined> {
    return await this.reservationService.getReservationById(reservationId);
  }
}
