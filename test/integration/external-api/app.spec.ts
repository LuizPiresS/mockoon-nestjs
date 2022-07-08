import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { AppService } from '../../../src/app.service';

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
        const url = 'http://localhost:3003/mock-swapi';
        const id = '3';
        const result = await wsapiService.getCharacterData(url, id);
        expect(result).toEqual({
          name: 'R2-D2',
          height: '96',
          mass: '32',
          hair_color: 'n/a',
          skin_color: 'white, blue',
          eye_color: 'red',
          birth_year: '33BBY',
          gender: 'n/a',
          homeworld: 'https://swapi.dev/api/planets/8/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/4/',
            'https://swapi.dev/api/films/5/',
            'https://swapi.dev/api/films/6/',
          ],
          species: ['https://swapi.dev/api/species/2/'],
          vehicles: [],
          starships: [],
          created: '2014-12-10T15:11:50.376000Z',
          edited: '2014-12-20T21:17:50.311000Z',
          url: 'https://swapi.dev/api/people/3/',
        });
      });
    });
  });
});
