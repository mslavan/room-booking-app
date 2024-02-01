import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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

  async getReservationById(reservationId: string): Promise<ReservationEntity | undefined> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['user', 'room'],
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found.`);
    }

    return reservation;
  }

  async getAllReservationsByUserId(userId: string): Promise<ReservationEntity[]> {
    return await this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'room'],
    });
  }

  async cancelReservation(userId: string, reservationId: string): Promise<void> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found.`);
    }

    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId, user },
      relations: ['user', 'room'],
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found.`);
    }

    reservation.status = 'canceled';

    await this.reservationRepository.save(reservation);
  }
}
