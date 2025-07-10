import { Component } from '@angular/core';
import { navigationLinks } from '../shared/global/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  navigationLinks = navigationLinks;
}