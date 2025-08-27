import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../enviroments/environment';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    // ...
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
})
export class AppModule {}
