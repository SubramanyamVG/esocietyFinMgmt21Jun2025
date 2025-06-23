import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersService } from '../shared/services/members.service';
import { SocietyMember } from '../shared/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})


export class MemberListComponent implements OnInit {

  memberForm: FormGroup;
  showModal = false;
  isEdit = false;
  selectedIndex: number = -1;
  members: SocietyMember[] = []; // This will hold the list of members 

  constructor(private fb: FormBuilder, private membersService: MembersService) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      apartmentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    
  }
  

  // members = [
  //   {
  //     name: 'Ramesh Iyer',
  //     apartment: 'A-101',
  //     email: 'ramesh@example.com',
  //     phone: '9876543210'
  //   },
  //   {
  //     name: 'Sunita Mehta',
  //     apartment: 'B-202',
  //     email: 'sunita@example.com',
  //     phone: '9876509876'
  //   }
  // ];

  
  

  ngOnInit() {
    // Fetch the members list from the service using firebase realtime database
    this.fetchMembers();
  }

  fetchMembers() {
    this.membersService.getMembersList().subscribe({
      next: (data: SocietyMember[]) => {
        // Assuming data is an array of SocietyMember objects
        console.log('Fetched members:', data);
        // Assign the fetched data to the members array
        if (!Array.isArray(data)) {
          this.members = Object.values(data || {});
          return;
        }
        // Ensure that data is an array of SocietyMember objects
        data = data.map(item => {
          return {
            name: item.name || '',
            apartmentNumber: item.apartmentNumber || '',
            email: item.email || '',
            phone: item.phone || ''
          } as SocietyMember;
        });
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

  openModal(member?: SocietyMember) {
    this.showModal = true;
    this.isEdit = !!member;

    if (member) {
      this.memberForm.patchValue(member);
      this.selectedIndex = this.members.indexOf(member);
    } else {
      this.memberForm.reset();
      this.selectedIndex = -1;
    }
  }

  closeModal() {
    this.showModal = false;
    this.memberForm.reset();
    this.selectedIndex = -1;
  }

  //write code to save family details to  Firebase using membersService
  saveMember() {
    if (this.memberForm.valid) {
      const memberData = this.memberForm.value;

       if (!this.isEdit) {
      memberData.id = 'M-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    }
      if (this.isEdit && this.selectedIndex > -1) {
        // Update existing member
        this.members[this.selectedIndex] = memberData;
      } else {
        // Add new member
        this.members.push(memberData);
      }
      this.membersService.addFamily(memberData).subscribe((response: any) => {
        console.log('Member saved successfully:', response);
        this.closeModal();
      }, (error: any) => {
        console.error('Error saving member:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  deleteMember(member: any) {
    this.members = this.members.filter((f: any) => f !== member);
  }
}