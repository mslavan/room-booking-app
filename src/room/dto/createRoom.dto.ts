import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'Name of the room' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Address of the room' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Number of rooms' })
  @IsNotEmpty()
  numberOfRooms: number;

  @ApiProperty({ description: 'Price per day in USD' })
  @IsNotEmpty()
  pricePerDayUSD: number;
}
