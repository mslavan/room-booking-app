import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationResponseDto {
  @ApiProperty({ description: 'Link with all reservations' })
  allReservations: string;

  @ApiProperty({ description: 'Cancel booked reservation' })
  cancelReservation: string;
}
