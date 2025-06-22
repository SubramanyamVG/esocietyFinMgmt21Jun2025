import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: []
})

export class MaintenanceComponent implements OnInit {
  payments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://your-firebase-url/maintenance.json')
      .subscribe(data => {
        this.payments = Object.values(data || {});
      });
  }
}