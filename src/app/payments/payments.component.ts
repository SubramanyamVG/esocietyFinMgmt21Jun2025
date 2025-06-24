import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MembersService } from '../shared/services/members.service';

export interface SocietyMember {
  memberId: string;
  name: string;
  apartmentNumber: string;
  email: string;
  phone: string;
  paymentDetails?: PaymentDetails[];
}

export interface PaymentDetails {
  month: string;
  amount: number;
  fine?: number;
  date?: string;
  mode?: string;
  status?: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  selectedMember: SocietyMember | null = null;
  showForm: boolean = false;
  paymentForm!: FormGroup;
  firebaseUrl = 'https://xxxx.firebaseio.com/societyMembers'; // Replace with your Firebase DB URL

  members: SocietyMember[] = []; // This will hold the list of members 
  originalMembersObj: any; // This will hold the original list of members for comparison
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  monthYearList: string[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private membersService: MembersService) { }

  ngOnInit(): void {
    this.generateMonthYearList();
    this.fetchMembers();
    this.initForm();
  }

  initForm() {
    const now = new Date();
    const defaultMonth = `${this.months[now.getMonth()]} ${now.getFullYear()}`;


    this.paymentForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      apartmentNumber: [{ value: '', disabled: true }],
      month: [defaultMonth, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      fine: [0],
      date: [now.toISOString().split('T')[0]],
      mode: ['Cash', Validators.required],
      status: ['Paid']
    });
  }


  generateMonthYearList() {
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear + 1]; // show 2 years

    for (let y of years) {
      for (let m of this.months) {
        this.monthYearList.push(`${m} ${y}`);
      }
    }
  }

  fetchMembers() {
    this.membersService.getMembersList().subscribe({
      next: (data: SocietyMember[]) => {
        // Assuming data is an array of SocietyMember objects
        console.log('Fetched members:', data);
        // Assign the fetched data to the members array
        if (!Array.isArray(data)) {
          console.log('Data is not an array, checking for object structure...', data);
          this.originalMembersObj = data

          this.members = Object.values(data || {});
          return;
        }

        // Assign the processed data to the members array
        if (data.length === 0) {
          console.warn('No members found in the fetched data.');
        }
        // Assign the fetched members to the component's members array
        this.members = data;
        // Optionally, you can sort the members by name or any other criteria
        this.members.sort((a, b) => a.name.localeCompare(b.name));
        // Log the fetched members to the console
        console.log('Members fetched successfully:', this.members);
      },
      error: (error: any) => {
        console.error('Error fetching members:', error);
      }
    });
  }

  openPaymentForm(member: SocietyMember) {
    this.selectedMember = member;
    this.showForm = true;

    this.paymentForm.reset({
      name: member.name,
      apartmentNumber: member.apartmentNumber,
      month: this.paymentForm.get('month')?.value || '',
      amount: 0,
      fine: 0,
      date: new Date().toISOString().split('T')[0],
      mode: 'Cash',
      status: 'Paid'
    });
  }


  submitPayment(memberId: string) {
    if (!this.paymentForm.valid) return;

    const payment: PaymentDetails = this.paymentForm.value;
    const existingPayments = this.selectedMember?.paymentDetails || [];
    const updatedPayments = [...existingPayments, payment];
    console.log('Updated Payments:', updatedPayments);
    console.log('Member ID:', memberId);
   
    this.membersService.getFirebaseKeyByMemberId1(memberId).subscribe((firebaseKey: string | null) => {
      console.log('firebaseKey:', firebaseKey);
      if (firebaseKey) {
        this.membersService.updateMemberPaymentDetailsByFirebaseKey(firebaseKey, updatedPayments).subscribe(() => {
          this.fetchMembers();
          this.showForm = false;
        });
      } else {
        console.error('Firebase key not found for memberId:', memberId);
      }
    });
  }

  // Add this method to your PaymentsComponent class

  getMemberById(memberId: string): SocietyMember | undefined {
    return this.members.find(member => member.memberId === memberId);
  }

  getselectedMemberKey(): string | undefined {
    const member = this.members.find(m => m.memberId === this.selectedMember?.memberId);
    return member?.memberId;
  }
}
