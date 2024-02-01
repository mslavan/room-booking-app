import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RoomService } from './room.service';

@Injectable()
export class GenerateRoomsCommand {
  constructor(private readonly roomService: RoomService) {}

  @Command({
    command: 'generate:rooms',
    describe: 'Generate random rooms',
  })
  async create() {
    const roomCount = 10;

    for (let i = 0; i < roomCount; i++) {
      const room = {
        name: `Room ${i + 1}`,
        address: `Address ${i + 1}`,
        numberOfRooms: Math.floor(Math.random() * 3) + 1,
        pricePerDayUSD: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
      };

      await this.roomService.createRoom(room);
    }

    console.log(`${roomCount} rooms generated successfully.`);
  }
}
