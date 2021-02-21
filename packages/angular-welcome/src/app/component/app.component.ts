import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api, Response } from '../../shared';
import { httpMock } from '../../development/http';

class State {
  constructor() {}

  name = '';
  home = '';
  content = '';
  message = '';
  showContent = false;
  isLoading = false;

  loading(state = true) {
    this.isLoading = state;
  }

  setHome(state: string) {
    this.isLoading = false;
    this.home = state;
  }

  setContent(state: string) {
    this.isLoading = false;
    this.showContent = true;
    this.content = state;
  }

  setMessage(state: string) {
    this.isLoading = false;
    this.message = state;
  }

  clearMsg() {
    this.message = '';
  }

  complete() {
    this.name = '';
    this.showContent = false;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  state = new State();

  constructor(private http: HttpClient) {
    /**
     * This only develpment webpack will remove it on compilation production.
     * https://medium.com/better-programming/reducing-js-bundle-size-a6533c183296
     */
    if (process.env.NODE_ENV === 'development') {
      this.http = httpMock;
    }

    this.fetchHome();
  }

  private onHome = (res: Response) => this.state.setHome(res.data);

  private onContent = (res: Response) => this.state.setContent(res.data);

  private onError = (error: any) => {
    console.log(error);
    this.state.setMessage(error.message || 'unknown error');
  };

  private fetchHome() {
    this.state.loading();

    this.http.get(api.home).subscribe(this.onHome, this.onError);
  }

  private fetchContent() {
    this.state.loading();

    this.http.get(api.content).subscribe(this.onContent, this.onError);
  }

  onSubmit() {
    if (this.state.content) {
      this.state.showContent = true;
      return;
    }

    this.fetchContent();
  }

  onBackMsg() {
    if (!this.state.home) {
      this.fetchHome();
    }

    this.state.clearMsg();
  }

  onOk() {
    this.state.complete();
  }
}

/**
 * Types
 */
export interface ResponseWelcome {
  data: string;
}
