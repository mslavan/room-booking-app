import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ description: 'Name of the room' })
  name: string;

  @ApiProperty({ description: 'Address of the room' })
  address: string;

  @ApiProperty({ description: 'Number of rooms' })
  numberOfRooms: number;

  @ApiProperty({ description: 'Price per day in USD' })
  pricePerDayUSD: number;
}
