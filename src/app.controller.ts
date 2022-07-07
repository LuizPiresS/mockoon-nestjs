import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCharacterData() {
    return this.appService.getCharacterData(
      'https://swapi.dev/api/people',
      '3',
    );
  }
}
