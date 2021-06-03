import { enableProdMode, Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

export function render<M>(Module: Type<M>) {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(Module)
    .catch((err) => console.error(err));
}
