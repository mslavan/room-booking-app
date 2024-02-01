import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbService } from './db.service';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';
import { ReservationEntity } from '../reservation/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        logging: false,
        entities: [UserEntity, RoomEntity, ReservationEntity],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, RoomEntity]),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DatabaseModule {}
