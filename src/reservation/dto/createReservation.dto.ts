import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'Start time of the reservation' })
  startTime: Date;

  @ApiProperty({ description: 'End time of the reservation' })
  endTime: Date;

  @ApiProperty({ description: 'ID of the room for the reservation' })
  roomId: number;

  @ApiProperty({ description: 'Full name for the reservation' })
  fullName: string;

  @ApiProperty({ description: 'Phone number for the reservation' })
  phoneNumber: string;

  @ApiProperty({ description: 'Email of the user making the reservation' })
  email: string;
}
