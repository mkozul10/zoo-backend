import { Test, TestingModule } from '@nestjs/testing';
import { NastambaController } from './nastamba.controller';
import { NastambaService } from './nastamba.service';

describe('NastambaController', () => {
  let controller: NastambaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NastambaController],
      providers: [NastambaService],
    }).compile();

    controller = module.get<NastambaController>(NastambaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
