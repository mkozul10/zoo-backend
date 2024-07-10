import { Module } from '@nestjs/common';
import { ZivotinjaService } from './zivotinja.service';
import { ZivotinjaController } from './zivotinja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zivotinja } from './entities/zivotinja.entity';
import { FileEntity } from './entities/file.entity';
import { HelperService } from 'src/helper/helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Zivotinja,
      FileEntity
    ])
  ],
  controllers: [ZivotinjaController],
  providers: [ZivotinjaService, HelperService],
})
export class ZivotinjaModule {}
