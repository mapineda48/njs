import { Component } from '@angular/core';

const message =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-welcome';
  message = message;
}
