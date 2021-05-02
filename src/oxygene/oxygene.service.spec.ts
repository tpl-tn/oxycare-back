import { Test, TestingModule } from '@nestjs/testing';
import { OxygeneService } from './oxygene.service';

describe('OxygeneService', () => {
  let service: OxygeneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OxygeneService],
    }).compile();

    service = module.get<OxygeneService>(OxygeneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
