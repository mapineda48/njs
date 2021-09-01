import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

import type { Data } from '../shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'welcome-angular';
  data: Data = { message: '' };

  constructor(private http: HttpService) {}

  ngOnInit() {
    if (this.data.message) return;

    this.data = { message: 'loading...' };

    this.http.fetchGreet().subscribe(
      (data) => (this.data = data),
      (err) => (this.data = { message: err.message })
    );
  }
}
