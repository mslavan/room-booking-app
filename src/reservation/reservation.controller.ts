import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReservationEntity } from './reservation.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { CreateReservationResponseDto } from './dto/createReservationResponse.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Reservation successfully created', type: CreateReservationResponseDto })
  async createReservation(@Body() createReservationDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
    const reservation = await this.reservationService.createReservation(createReservationDto);

    const userId = reservation.user.id;
    const domain = this.configService.get<string>('appUrl');
    const allReservationsLink = `${domain}/users/${userId}/reservations`;
    const cancelReservationLink = `${domain}/users/${userId}/reservations/${reservation.id}/cancel`;

    return { allReservations: allReservationsLink, cancelReservation: cancelReservationLink };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Reservation found', type: ReservationEntity })
  @ApiResponse({ status: 404, description: 'Reservation not found' })
  async getReservationById(@Param('id') reservationId: string): Promise<ReservationEntity | undefined> {
    return await this.reservationService.getReservationById(reservationId);
  }

  @Get('users/:userId/reservations')
  @ApiResponse({ status: 200, description: 'All reservations for the user', type: ReservationEntity, isArray: true })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getAllReservationsByUserId(@Param('userId') userId: string): Promise<ReservationEntity[]> {
    return await this.reservationService.getAllReservationsByUserId(userId);
  }
}
