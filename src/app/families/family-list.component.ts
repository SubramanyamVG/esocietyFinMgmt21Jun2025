import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent {

  families = [
    {
      name: 'Ramesh Iyer',
      apartment: 'A-101',
      email: 'ramesh@example.com',
      phone: '9876543210'
    },
    {
      name: 'Sunita Mehta',
      apartment: 'B-202',
      email: 'sunita@example.com',
      phone: '9876509876'
    }
  ];

  familyForm: FormGroup;
  showModal = false;
  isEdit = false;
  selectedIndex: number = -1;

  constructor(private fb: FormBuilder) {
    this.familyForm = this.fb.group({
      name: ['', Validators.required],
      apartment: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  openModal(family?: any) {
    this.showModal = true;
    this.isEdit = !!family;

    if (family) {
      this.familyForm.patchValue(family);
      this.selectedIndex = this.families.indexOf(family);
    } else {
      this.familyForm.reset();
      this.selectedIndex = -1;
    }
  }

  closeModal() {
    this.showModal = false;
    this.familyForm.reset();
    this.selectedIndex = -1;
  }

  saveFamily() {
    const formValue = this.familyForm.value;
    if (this.isEdit && this.selectedIndex !== -1) {
      this.families[this.selectedIndex] = formValue;
    } else {
      this.families.push(formValue);
    }
    this.closeModal();
  }

  deleteFamily(family: any) {
    this.families = this.families.filter(f => f !== family);
  }
}