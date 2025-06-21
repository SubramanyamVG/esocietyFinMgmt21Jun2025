import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivitiesComponent } from './activities.component';

const routes: Routes = [
  { path: '', component: ActivitiesComponent }
];

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class ActivitiesModule {}
