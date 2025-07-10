import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ActivitiesComponent } from './activities/activities.component';
import { MemberListComponent } from './member/member-list.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportsComponent } from './reports/reports.component';

// const routes: Routes = [
//   // {
//   //   path: 'reports',
//   //   loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
//   // },
//   // {
//   //   path: 'checker',
//   //   loadChildren: () => import('./checker/checker.module').then(m => m.CheckerModule)
//   // },
//   // {
//   //   path: 'payments',
//   //   loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule)
//   // },
//   // {
//   //   path: 'activities',
//   //   loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule)
//   // },
//   {
//     path: 'maintenance',
//     loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule)
//   },

//   { path: '', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'dashboard/families', component: FamilyListComponent },
//   { path: 'maintenance', component: MaintenanceComponent },
//   // { path: 'payments', component: PaymentsComponent },
//   { path: 'activities', component: ActivitiesComponent },
//   // { path: '', redirectTo: '/families', pathMatch: 'full' },
//   // {
//   //   path: 'families',
//   //   loadChildren: () => import('./families/families.module').then(m => m.FamiliesModule)
//   // }
// ];

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'members', pathMatch: 'full' } // default child
    ]
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
