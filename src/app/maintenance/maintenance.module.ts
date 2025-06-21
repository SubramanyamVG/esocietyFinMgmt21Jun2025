import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';

const routes: Routes = [
  { path: '', component: MaintenanceComponent }
];

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MaintenanceModule {}