import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { GenerateRoomsCommand } from './generate-rooms.command';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  providers: [RoomService, GenerateRoomsCommand],
  controllers: [RoomController],
})
export class RoomModule {}
