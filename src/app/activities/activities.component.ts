import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  template: `
  <div class="container mt-4">
    <h3>Society Activities</h3>
    <ul class="list-group">
      <li *ngFor="let a of activities" class="list-group-item">
        {{ a.date }} - {{ a.name }} ({{ a.cost ? '₹' + a.cost : 'No Cost' }})
      </li>
    </ul>
  </div>
  `
})
export class ActivitiesComponent implements OnInit {
  activities: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://your-firebase-url/activities.json')
      .subscribe(data => this.activities = Object.values(data || {}));
  }
}
