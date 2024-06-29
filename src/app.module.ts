import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MssqlDbConfigService } from './config/typeorm.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MssqlDbConfigService,
      inject: [MssqlDbConfigService],
    }),
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    MssqlDbConfigService
  ],
})
export class AppModule {}
