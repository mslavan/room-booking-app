import { Injectable } from '@nestjs/common';
import { ReservationEntity } from '../reservation/reservation.entity';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    // Simulate email sending (mocked)
    console.log(`Sending email to ${to} with subject: ${subject} and message: ${message}`);
  }

  async sendReservationConfirmation(to: string, subject: string, reservation: ReservationEntity): Promise<void> {
    const message = `
      Dear ${to},

      Your reservation has been confirmed:
      Room ID: ${reservation.room.id}
      Start Date: ${reservation.startDate}
      End Date: ${reservation.endDate}

      Thank you for choosing our service!
    `;

    this.sendEmail(to, subject, message);
  }
}
