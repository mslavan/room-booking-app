import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ default: 'booked' })
  @ApiProperty()
  status: string;

  @Column({ type: 'date', name: 'start_date' })
  @ApiProperty()
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  @ApiProperty()
  endDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.reservations)
  @JoinColumn({ name: 'room_id' })
  @ApiProperty({ type: () => RoomEntity })
  room: RoomEntity;
}
