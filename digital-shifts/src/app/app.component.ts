import { Component } from '@angular/core';
import { HttpService } from './service/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  res = 'digital-shifts';

  isLoading = false;

  constructor(private http: HttpService) {}

  fetch() {
    this.http.fetchHello().subscribe(
      (res) => {
        this.res = res.message;
      },
      (err) => {
        this.res = err.message;
      }
    );
  }
}
