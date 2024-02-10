import { Routes } from '@angular/router';
import { DataTableComponent } from './DataTable/DataTable.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dataTable' },
  { path: 'dataTable', component: DataTableComponent },
  { path: '**', component: DataTableComponent },
];
