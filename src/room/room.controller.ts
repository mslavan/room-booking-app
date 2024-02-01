import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/createRoom.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<RoomEntity> {
    return await this.roomService.createRoom(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  async getAllRooms(): Promise<RoomEntity[]> {
    return await this.roomService.getAllRooms();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get room by ID' })
  async getRoomById(@Param('id') roomId: string): Promise<RoomEntity | undefined> {
    return await this.roomService.getRoomById(roomId);
  }
}
