import { Test, TestingModule } from '@nestjs/testing';
import { NastambaZivotinjaService } from './nastamba-zivotinja.service';

describe('NastambaZivotinjaService', () => {
  let service: NastambaZivotinjaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NastambaZivotinjaService],
    }).compile();

    service = module.get<NastambaZivotinjaService>(NastambaZivotinjaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
