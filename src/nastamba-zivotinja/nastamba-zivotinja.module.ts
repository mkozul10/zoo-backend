import { Module } from '@nestjs/common';
import { NastambaZivotinjaService } from './nastamba-zivotinja.service';
import { NastambaZivotinjaController } from './nastamba-zivotinja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NastambaZivotinja } from './entities/nastamba-zivotinja.entity';
import { Nastamba } from 'src/nastamba/entities/nastamba.entity';
import { Zivotinja } from 'src/zivotinja/entities/zivotinja.entity';
import { HelperService } from 'src/helper/helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NastambaZivotinja,
      Nastamba,
      Zivotinja
    ])
  ],
  controllers: [NastambaZivotinjaController],
  providers: [NastambaZivotinjaService, HelperService],
})
export class NastambaZivotinjaModule {}
