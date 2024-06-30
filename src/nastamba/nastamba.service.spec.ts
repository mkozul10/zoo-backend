import { Test, TestingModule } from '@nestjs/testing';
import { NastambaService } from './nastamba.service';

describe('NastambaService', () => {
  let service: NastambaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NastambaService],
    }).compile();

    service = module.get<NastambaService>(NastambaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
