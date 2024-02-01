import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/user.entity";
import { RoomService } from "../room/room.service";
import { RoomEntity } from "../room/room.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity, UserEntity, RoomEntity]), UserModule, RoomModule],
  providers: [UserService, RoomService, ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
