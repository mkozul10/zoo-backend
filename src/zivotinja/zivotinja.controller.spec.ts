import { Test, TestingModule } from '@nestjs/testing';
import { ZivotinjaController } from './zivotinja.controller';
import { ZivotinjaService } from './zivotinja.service';

describe('ZivotinjaController', () => {
  let controller: ZivotinjaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZivotinjaController],
      providers: [ZivotinjaService],
    }).compile();

    controller = module.get<ZivotinjaController>(ZivotinjaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
