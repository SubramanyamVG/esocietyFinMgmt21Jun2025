import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  payments = [
    {
      name: 'Ramesh Iyer',
      apartment: 'A-101',
      month: 'June 2025',
      amount: 1500,
      date: '2025-06-05',
      mode: 'UPI',
      status: 'Success'
    },
    {
      name: 'Sunita Mehta',
      apartment: 'B-202',
      month: 'May 2025',
      amount: 1500,
      date: '2025-05-12',
      mode: 'Cash',
      status: 'Pending'
    }
  ];

  paymentForm: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      apartment: ['', Validators.required],
      month: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      mode: ['UPI', Validators.required],
      status: ['Success', Validators.required]
    });
  }

  openModal() {
    this.showModal = true;
    this.paymentForm.reset({ mode: 'UPI', status: 'Success' });
  }

  closeModal() {
    this.showModal = false;
    this.paymentForm.reset();
  }

  savePayment() {
    if (this.paymentForm.valid) {
      this.payments.push(this.paymentForm.value);
      this.closeModal();
    }
  }
}
