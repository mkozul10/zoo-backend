import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MssqlDbConfigService } from './config/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { User } from './user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ZivotinjaModule } from './zivotinja/zivotinja.module';
import { NastambaModule } from './nastamba/nastamba.module';

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
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    StatusModule,
    ZivotinjaModule,
    NastambaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    MssqlDbConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    JwtService
  ],
})
export class AppModule {}
