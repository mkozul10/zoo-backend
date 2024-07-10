import { Module } from '@nestjs/common';
import { NastambaService } from './nastamba.service';
import { NastambaController } from './nastamba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nastamba } from './entities/nastamba.entity';
import { HelperService } from 'src/helper/helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nastamba]),
  ],
  controllers: [NastambaController],
  providers: [NastambaService, HelperService],
})
export class NastambaModule {}
