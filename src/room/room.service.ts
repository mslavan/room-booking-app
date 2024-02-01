import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './room.entity';
import { CreateRoomDto } from './dto/createRoom.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    const newRoom = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(newRoom);
  }

  async getRoomById(roomId: string): Promise<RoomEntity | undefined> {
      return await this.roomRepository.findOneOrFail({
        where: { id: roomId },
        relations: ['reservations'],
      });
  }

  async getAllRooms(): Promise<RoomEntity[]> {
    return await this.roomRepository.find();
  }
}
