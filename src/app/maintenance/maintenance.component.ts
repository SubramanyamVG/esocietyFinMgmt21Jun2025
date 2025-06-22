import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  maintenanceRecords = [
    {
      month: 'June 2025',
      dueDate: '2025-06-10',
      amount: 1500,
      status: 'Paid'
    },
    {
      month: 'May 2025',
      dueDate: '2025-05-10',
      amount: 1500,
      status: 'Unpaid'
    }
  ];

  maintenanceForm: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder) {
    this.maintenanceForm = this.fb.group({
      month: ['', Validators.required],
      dueDate: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      status: ['Unpaid', Validators.required]
    });
  }

  openModal() {
    this.showModal = true;
    this.maintenanceForm.reset({ status: 'Unpaid' });
  }

  closeModal() {
    this.showModal = false;
    this.maintenanceForm.reset();
  }

  generateMaintenance() {
    if (this.maintenanceForm.valid) {
      this.maintenanceRecords.push(this.maintenanceForm.value);
      this.closeModal();
    }
  }
}
