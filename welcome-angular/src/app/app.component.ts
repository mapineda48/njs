import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { Data } from '../shared';

const message =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'welcome-angular';
  data: Data = { message: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.data.message) return;

    this.data = { message: 'loading...' };

    this.http.get<Data>('api').subscribe(
      (data) => (this.data = data),
      (err) => (this.data = { message: err.message })
    );
  }
}
