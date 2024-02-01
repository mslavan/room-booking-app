import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { CreateReservationDto } from './dto/createReservation.dto';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly emailService: EmailService
  ) {}

  async createReservation(createReservationDto: CreateReservationDto): Promise<ReservationEntity> {
    const { email, roomId, startDate, endDate, ...reservationData } = createReservationDto;

    let user = await this.userService.findByEmail(email);

    if (!user) {
      user = await this.userService.createUser({ email });
    }

    const room = await this.roomService.getRoomById(roomId);

    if (!room) {
      throw new BadRequestException(`Room with ID ${roomId} not found.`);
    }

    // Check room availability for the entire period
    if (!(await this.isRoomAvailable(roomId, startDate, endDate))) {
      throw new BadRequestException(`Room with ID ${roomId} is not available during the specified period.`);
    }

    const newReservation = this.reservationRepository.create({
      ...reservationData,
      user,
      room: { id: roomId },
      startDate,
      endDate,
    });

    const savedReservation = await this.reservationRepository.save(newReservation);

    this.emailService.sendReservationConfirmation(
      createReservationDto.email,
      'Reservation Confirmation',
      savedReservation
    );

    return savedReservation;
  }

  private async isRoomAvailable(roomId: string, startDate: Date, endDate: Date): Promise<boolean> {
    const reservations = await this.reservationRepository.find({
      where: {
        room: { id: roomId },
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });

    return reservations.length === 0;
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

  async isRoomAvailableInPeriod(roomId: string, startDate: Date, endDate: Date): Promise<boolean> {
    const reservations = await this.reservationRepository.find({
      where: {
        room: { id: roomId },
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });

    return reservations.length === 0;
  }

  isValidDateRange(startDate: Date, endDate: Date): boolean {
    return startDate <= endDate;
  }

  private getBookingDates(startDate: Date, _endDate: Date): string[] {
    const bookingDates: string[] = [];
    let currentDate = new Date(startDate);
    const endDate = new Date(_endDate);


    while (currentDate <= endDate) {
      const formattedDate = currentDate.toLocaleDateString('en-GB');
      bookingDates.push(formattedDate);
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    return bookingDates;
  }

  async getAvailableDays(roomId: string, startDate: Date, endDate: Date): Promise<string[]> {
    const reservations = await this.reservationRepository.find({
      where: {
        room: { id: roomId },
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });

    // Get the booked dates
    const bookedDates: string[] = [];
    reservations.forEach((reservation) => {
      const dates = this.getBookingDates(reservation.startDate, reservation.endDate);
      bookedDates.push(...dates);
    });

    // Get the available dates
    const allDates = this.getBookingDates(startDate, endDate);
    const availableDates = allDates.filter((date) => !bookedDates.includes(date));

    return availableDates;
  }


}
