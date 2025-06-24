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
  originalMembersObj: any; // This will hold the original list of members for comparison

  constructor(private fb: FormBuilder, private membersService: MembersService) {
    this.memberForm = this.fb.group({
      memberId: [''],
      name: ['', Validators.required],
      apartmentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }
  // Sample data for testing purposes
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

  // Function to save or update member details
  saveMember() {
    if (this.memberForm.valid) {
      const memberData = this.memberForm.value;
      // Generate a unique memberId if it's a new member
      if (!this.isEdit) {
        memberData.memberId = 'M-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
      }
      // If editing, use the existing memberId
      else {
       //write code to get memberid of the selected member from the members array
        memberData.memberId = this.members[this.selectedIndex].memberId;
      }
      
      // Save the member data using the membersService
      this.membersService.addMember(memberData).subscribe((response: any) => {
        console.log('Member saved successfully:', response);
        // Update the local members array
        if (this.isEdit && this.selectedIndex > -1) {
          this.members[this.selectedIndex] = memberData;
        } else {
          this.members.push(memberData);
        }
        this.closeModal();
      }, (error: any) => {
        console.error('Error saving member:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  updateMember() {
    if (this.memberForm.valid) {
      const memberData = this.memberForm.value;
      // Use the existing memberId for updating
      memberData.memberId = this.members[this.selectedIndex].memberId;
      const firebaseKey = this.getFirebaseKeyByMemberId(memberData.memberId);
      if (firebaseKey) {
        // Update the member data using the membersService
        this.membersService.updateMember(firebaseKey, memberData).subscribe((response: any) => {
          console.log('Member updated successfully:', response);
          // Update the local members array
          this.members[this.selectedIndex] = memberData;
          this.closeModal();
        }, (error: any) => {
          console.error('Error updating member:', error);
        });
      } else {
        console.warn('Firebase key not found for memberId:', memberData.memberId);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  deleteMember(memberId: string) {
    //write code to delete member from firebase using member service passing firebase key from the fetched members from data object
    const firebaseKey = this.getFirebaseKeyByMemberId(memberId);
    if (firebaseKey) {
      this.membersService.deleteMemberByFirebaseKey(firebaseKey).subscribe((response: any) => {
        console.log('Member deleted successfully:', response);
        // Remove the member from the local array
        this.members = this.members.filter(m => m.memberId !== memberId);
      }, (error: any) => {
        console.error('Error deleting member:', error);
      });
    } else {
      console.warn('Member not found with memberId:', memberId);
    }
  }

  //write a function to get the firebase key of the member by memberId from originalMembersObj
  getFirebaseKeyByMemberId(memberId: string): string | null {
    if (!this.originalMembersObj) {
      console.warn('Original members object is not available.');
      return null;
    }
    const member = Object.values(this.originalMembersObj).find((m: any) => m.memberId === memberId);
    if (member) {
      const firebaseKey = Object.keys(this.originalMembersObj).find(key => this.originalMembersObj[key].memberId === memberId);
      return firebaseKey || null;
    }
    console.warn('Member not found with memberId:', memberId);
    return null;
  }

  //write a function to edit a member by passing the memberId
  editMember(memberId: string) {
    const member = this.members.find(m => m.memberId === memberId);
    if (member) {
      this.openModal(member);
    } else {
      console.warn('Member not found with memberId:', memberId);
    }
  } 
}