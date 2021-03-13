import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api, ResHello } from '.';
import { httpMock } from './development/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    if (process.env.NODE_ENV === 'development') {
      this.http = httpMock;
    } else {
      this.http = http;
    }
  }

  fetchHello() {
    return this.http.get(api.hello) as Observable<ResHello>;
  }
}
