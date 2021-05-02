import { Test, TestingModule } from '@nestjs/testing';
import { OxygeneController } from './oxygene.controller';

describe('OxygeneController', () => {
  let controller: OxygeneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OxygeneController],
    }).compile();

    controller = module.get<OxygeneController>(OxygeneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
