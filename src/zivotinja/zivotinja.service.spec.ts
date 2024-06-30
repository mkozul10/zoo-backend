import { Test, TestingModule } from '@nestjs/testing';
import { ZivotinjaService } from './zivotinja.service';

describe('ZivotinjaService', () => {
  let service: ZivotinjaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZivotinjaService],
    }).compile();

    service = module.get<ZivotinjaService>(ZivotinjaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
