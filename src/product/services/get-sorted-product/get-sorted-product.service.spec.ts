import { Test, TestingModule } from '@nestjs/testing';
import { GetSortedProductService } from './get-sorted-product.service';

describe('GetSortedProductService', () => {
  let service: GetSortedProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSortedProductService],
    }).compile();

    service = module.get<GetSortedProductService>(GetSortedProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
