import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MssqlDbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      synchronize: false,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.js}'],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: this.configService.get('database.exec_migrations') == 'true',
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    };
  }
}
