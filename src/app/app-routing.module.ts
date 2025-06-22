import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'reports',
  //   loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  // },
  // {
  //   path: 'checker',
  //   loadChildren: () => import('./checker/checker.module').then(m => m.CheckerModule)
  // },
  // {
  //   path: 'payments',
  //   loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule)
  // },
  // {
  //   path: 'activities',
  //   loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule)
  // },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule)
  },

  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'families',
    loadChildren: () => import('./families/families.module').then(m => m.FamiliesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
