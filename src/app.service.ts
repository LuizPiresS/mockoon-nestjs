import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AppService {
  async getCharacterData(url: string, id: string) {
    try {
      const data = await axios.get(`${url}/${id}`, {
        headers: {
          Authorization: 'fake-token',
        },
      });
      return data.data;
    } catch (err) {
      console.log(err.module);
    }
  }
}
