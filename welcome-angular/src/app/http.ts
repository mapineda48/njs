import type { HttpClient } from '@angular/common/http';
import type { Data } from '../shared';

export class Http {
  constructor(private httpClient: HttpClient, private baseUrl = '') {}

  public fetchGreet() {
    return this.httpClient.get<Data>(this.baseUrl + 'api');
  }
}
