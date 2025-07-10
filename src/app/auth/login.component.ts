import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USER_TYPES } from '../shared/global/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent {
  userTypes = Object.values(USER_TYPES); // List of user types
  loginData = {
    userType: USER_TYPES.ADMIN, // Default user type
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  login(loginForm: NgForm) {
    console.log('Login form submitted:', loginForm.value);
    // Validate form before proceeding
    if (loginForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    if (loginForm.value.username === 'admin' && loginForm.value.password === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}