import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: []
})
export class AddFamilyComponent {
  name = '';
  apartment = '';
  email = '';

  constructor(private http: HttpClient, private router: Router) {}

  addFamily() {
    const data = { name: this.name, apartment: this.apartment, email: this.email };
    this.http.post('https://your-firebase-url/families.json', data)
      .subscribe(() => this.router.navigate(['/families']));
  }
}