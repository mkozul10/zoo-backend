import { Module } from '@nestjs/common';
import { ZivotinjaService } from './zivotinja.service';
import { ZivotinjaController } from './zivotinja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zivotinja } from './entities/zivotinja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Zivotinja
    ])
  ],
  controllers: [ZivotinjaController],
  providers: [ZivotinjaService],
})
export class ZivotinjaModule {}
