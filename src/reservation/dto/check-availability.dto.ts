import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CheckAvailabilityDto {
  @ApiProperty({ description: 'ID of the room for availability checking' })
  @IsUUID('4')
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ description: 'Start date of the availability period', example: '2024-02-15' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'End date of the availability period', example: '2024-02-20' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
