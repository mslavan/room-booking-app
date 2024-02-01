import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ default: 'booked' })
  @ApiProperty()
  status: string;

  @Column({ name: 'start_time' })
  @ApiProperty()
  startTime: Date;

  @Column({ name: 'end_time' })
  @ApiProperty()
  endTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.reservations)
  @JoinColumn({ name: 'room_id' })
  @ApiProperty({ type: () => RoomEntity })
  room: RoomEntity;
}
