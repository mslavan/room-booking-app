import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationEntity } from '../reservation/reservation.entity';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  address: string;

  @Column({ name: 'number_of_rooms' })
  @ApiProperty()
  numberOfRooms: number;

  @Column({ name: 'price_per_day_usd' })
  @ApiProperty()
  pricePerDayUSD: number;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.room, { nullable: true })
  @ApiProperty({ type: () => ReservationEntity, isArray: true, required: false })
  reservations: ReservationEntity[];
}
