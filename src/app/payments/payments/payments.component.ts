import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MembersService } from 'src/app/shared/services/members.service';
declare var bootstrap: any; // Add this if using Bootstrap 5

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html'
})
export class PaymentsComponent implements OnInit {

  @ViewChild('paymentModal') paymentModal!: ElementRef;
  
  payments: any[] = [];
  // payments = [
  //   {
  //     name: 'Ramesh Iyer',
  //     apartment: 'A-101',
  //     month: 'June 2025',
  //     amount: 1500,
  //     date: '2025-06-05',
  //     mode: 'UPI',
  //     status: 'Success'
  //   },
  //   {
  //     name: 'Sunita Mehta',
  //     apartment: 'B-202',
  //     month: 'May 2025',
  //     amount: 1500,
  //     date: '2025-05-12',
  //     mode: 'Cash',
  //     status: 'Pending'
  //   }
  // ];
  members: any[] = [];

  newPayment = {
    memberId:'',
    name: '',
    apartmentNumber: '',
    month: '',
    amount: 0,
    fine: 0,
    date: '',
    mode: '',
    status: ''
  };

  constructor(private membersService: MembersService) {}

  ngOnInit() {
    this.fetchPayments();
    this.fetchMembers();
  }

  fetchPayments() {
    this.membersService.getPaymentsList().subscribe(data => this.payments = Object.values(data || {}));
  }

  fetchMembers() {
    this.membersService.getMembersList().subscribe(data => {
      this.members = Object.values(data || {});
    });
  }

  addPayment1(paymentDetails: any) {
    this.membersService.updateMemberPaymentDetails(paymentDetails.memberId, paymentDetails)
      .subscribe({
        next: () => {
          // Handle successful update
          this.fetchPayments();
          this.fetchMembers();
        },
        error: error => {
          // Handle error
          console.error('Error updating payment details:', error);
        }
      });
  }

  addPayment() {
    if (this.newPayment.memberId && this.newPayment.month && this.newPayment.amount > 0) {
      this.membersService.addFamily(this.newPayment).subscribe({
        next: () => {
          this.fetchPayments();
          this.newPayment = {
            memberId: '',
            name: '',
            apartmentNumber: '',
            month: '',
            amount: 0,
            fine: 0,
            date: '',
            mode: '',
            status: ''
          };
        },
        error: error => {
          console.error('Error adding payment:', error);
        }
      });
    } else {
      console.warn('Please fill in all required fields.');
    }
  }

  

  // addPayment1() {
  //   this.http.post('https://<your-firebase-url>/payments.json', this.newPayment)
  //     .subscribe(() => {
  //       this.fetchPayments();
  //       this.newPayment = { family: '', month: '', amount: 0, fine: false, status: 'Paid' };
  //     });
  // }

  openModal() {
    const modal = new bootstrap.Modal(this.paymentModal.nativeElement);
    modal.show();
  }

}
