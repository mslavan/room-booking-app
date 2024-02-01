import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationEntity } from '../reservation/reservation.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  @ApiProperty({ type: () => ReservationEntity, isArray: true })
  reservations: ReservationEntity[];
}
