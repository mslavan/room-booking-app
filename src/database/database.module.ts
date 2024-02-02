import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbService } from './db.service';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';
import { ReservationEntity } from '../reservation/reservation.entity';

const generateConnectionUri = (options: any): string =>
  `postgresql://${options.username}:${options.password}@${options.host}:${options.port}/${options.database}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const connectionOptions: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: true,
          logging: true,
          entities: [UserEntity, RoomEntity, ReservationEntity],
        };

        // Log the connection URI
        console.log(`Database Connection URI: ${generateConnectionUri(connectionOptions)}`);

        return connectionOptions;
      },

      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, RoomEntity]),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DatabaseModule {}
