import { ApiProperty } from '@nestjs/swagger';
import {IsDateString, IsUUID, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ description: 'Start date of the reservation', example: '2024-02-15' })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'End date of the reservation', example: '2024-02-20' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ description: 'ID of the room for the reservation' })
  @IsUUID('4')
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ description: 'Full name for the reservation' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Phone number for the reservation' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Email of the user making the reservation' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
