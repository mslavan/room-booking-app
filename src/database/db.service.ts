import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: true, // Only in development. Set to false in production.
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}
