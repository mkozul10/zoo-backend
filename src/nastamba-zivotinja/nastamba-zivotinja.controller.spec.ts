import { Test, TestingModule } from '@nestjs/testing';
import { NastambaZivotinjaController } from './nastamba-zivotinja.controller';
import { NastambaZivotinjaService } from './nastamba-zivotinja.service';

describe('NastambaZivotinjaController', () => {
  let controller: NastambaZivotinjaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NastambaZivotinjaController],
      providers: [NastambaZivotinjaService],
    }).compile();

    controller = module.get<NastambaZivotinjaController>(NastambaZivotinjaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
