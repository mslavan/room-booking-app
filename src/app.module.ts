import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { DbService } from './database/db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    RoomModule,
    ReservationModule,
    CommandModule,
  ],
  providers: [DbService],
  exports: [DbService],

})
export class AppModule {}
