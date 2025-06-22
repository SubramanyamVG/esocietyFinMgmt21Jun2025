import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: []
})
export class FamilyListComponent implements OnInit {
  families: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://your-firebase-url/families.json')
      .subscribe(data => {
        this.families = Object.values(data || {});
      });
  }
}