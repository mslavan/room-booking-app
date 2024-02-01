import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { CreateReservationDto } from './dto/createReservation.dto';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  async createReservation(createReservationDto: CreateReservationDto): Promise<ReservationEntity> {
    const { email, roomId, ...reservationData } = createReservationDto;

    let user = await this.userService.findByEmail(email);

    if (!user) {
      user = await this.userService.createUser({ email });
    }

    try {
      await this.roomService.getRoomById(roomId);
    } catch (error) {
      throw new BadRequestException(`Room with ID ${roomId} not found.`);
    }

    const newReservation = this.reservationRepository.create({
      ...reservationData,
      user,
      room: { id: roomId },
    });

    return await this.reservationRepository.save(newReservation);
  }

  async getReservationById(reservationId: number): Promise<ReservationEntity | undefined> {
    return await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['user', 'room'],
    });
  }
}