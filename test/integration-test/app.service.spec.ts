import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';

describe('AnymarketService', () => {
  let anymarketService: AnymarketService;
  let service: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AnymarketService,
        {
          provide: HttpService,
          useValue: service,
        },
      ],
    }).compile();

    anymarketService = await module.resolve<AnymarketService>(AnymarketService);
  });

  describe('AnymarketService List', () => {
    it('should be defined', async () => {
      expect(anymarketService).toBeDefined();
    });

    describe('list', () => {
      it('should return core', async () => {
        await anymarketService.setup(sample.anymarketConfig);

        const result = (await anymarketService.list().next()).value;
        expect(result).toEqual({
          items: {
            content: [
              {
                createdAt: '2019-01-01T00:00:00.000Z',
                createdBy: 'test',
                deletedAt: null,
                deletedBy: null,
                description: 'test',
                id: 1,
                name: 'test',
                updatedAt: '2019-01-01T00:00:00.000Z',
                updatedBy: 'test',
              },
            ],
            number: 0,
            numberOfElements: 1,
            size: 10,
            totalElements: 1,
            totalPages: 1,
          },
          metadata: {
            page: 1,
            params: {
              limit: 10,
              offset: 0,
              url: 'http://localhost:3001/workers/ingestor/anymarket-plugin',
            },
          },
        });
      });
    });
  });
});
