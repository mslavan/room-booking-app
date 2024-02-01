import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ConfigService } from '@nestjs/config';
import { CreateReservationDto } from './dto/createReservation.dto';
import { ReservationEntity } from './reservation.entity';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { CreateReservationResponseDto } from './dto/createReservationResponse.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';


describe('ReservationController', () => {
  let controller: ReservationController;
  let reservationService: ReservationService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: {
            createReservation: jest.fn(),
            checkAvailability: jest.fn(),
            checkRoomAvailability: jest.fn(),
            getReservationById: jest.fn(),
            getAllReservationsByUserId: jest.fn(),
            isValidDateRange: jest.fn(),
            cancelReservation: jest.fn(),
            getAvailableDays: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    reservationService = module.get<ReservationService>(ReservationService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('createReservation', () => {
    it('should create a reservation and return links', async () => {
      const createReservationDto: CreateReservationDto = {
        email: 'user@example.com',
        roomId: 'room-id',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-05'),
        fullName: 'John Black',
        phoneNumber: '1111111'
      };

      const createReservationRequest = {
        id: 'reservation-id',
        status: 'booked',
        startDate: new Date(createReservationDto.startDate),
        endDate: new Date(createReservationDto.endDate),
        user: {
          id: 'user-id',
        },
        room: {
          id: 'room-id',
        },
      } as ReservationEntity;


      const createReservationResponse: CreateReservationResponseDto = {
        allReservations: `http://example.com/users/${createReservationRequest.user.id}/reservations`,
        cancelReservation: `http://example.com/users/${createReservationRequest.user.id}/reservations/${createReservationRequest.id}/cancel`,
      };


      jest.spyOn(reservationService, 'createReservation').mockResolvedValue(createReservationRequest);
      jest.spyOn(configService, 'get').mockReturnValue('http://example.com');

      const result = await controller.createReservation(createReservationDto);

      expect(result).toEqual(createReservationResponse);
    });

  });

  describe('checkAvailability', () => {
    it('should return available days', async () => {
      const checkAvailabilityDto: CheckAvailabilityDto = {
        roomId: 'room-id',
        startDate: '2024-02-01',
        endDate: '2024-02-05',
      };

      const availableDays: string[] = ['2024-02-01', '2024-02-02', '2024-02-03'];

      jest.spyOn(reservationService, 'getAvailableDays').mockResolvedValue(availableDays);

      const result = await controller.checkAvailability(checkAvailabilityDto);

      expect(result).toEqual(availableDays);
    });

  });

});
