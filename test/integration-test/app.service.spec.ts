import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { AppService } from '../../src/app.service';

describe('AppService', () => {
  let wsapiService: AppService;
  let service: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: service,
        },
      ],
    }).compile();

    wsapiService = await module.resolve<AppService>(AppService);
  });

  describe('AppService', () => {
    it('should be defined', async () => {
      expect(wsapiService).toBeDefined();
    });

    describe('getCharacterData', () => {
      it('should return character data', async () => {
        const result = await wsapiService.getCharacterData(
          'https://swapi.dev/api/people',
          '1',
        );
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
