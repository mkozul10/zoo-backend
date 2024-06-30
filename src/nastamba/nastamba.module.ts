import { Module } from '@nestjs/common';
import { NastambaService } from './nastamba.service';
import { NastambaController } from './nastamba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nastamba } from './entities/nastamba.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nastamba]),
  ],
  controllers: [NastambaController],
  providers: [NastambaService],
})
export class NastambaModule {}
