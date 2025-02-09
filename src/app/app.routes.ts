import { Routes } from '@angular/router';
import { ScanDetailsComponent } from './scan-details/scan-details';
import { ScanResultComponent } from './scan-result/scan-result.component';

export const routes: Routes = [
  {
    path: 'scan',
    component: ScanResultComponent,
  },
  {
    path: 'scan/:id',
    component: ScanDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'scan'
  }
];
