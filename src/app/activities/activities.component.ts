import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Activity {
  title: string;
  date: string;
  description: string;
  type: string;
}

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  activities = [
    {
      title: 'Annual General Meeting',
      date: '2025-06-25',
      description: 'All members are requested to attend the AGM at the clubhouse.',
      type: 'Meeting'
    },
    {
      title: 'Monsoon Cleaning Drive',
      date: '2025-06-22',
      description: 'Volunteers needed to help clean the common areas and drainage.',
      type: 'Event'
    },
    {
      title: 'Maintenance Due Reminder',
      date: '2025-06-10',
      description: 'June 2025 maintenance due. Please pay before the due date.',
      type: 'Notice'
    }
  ];

  activityForm: FormGroup;
  showModal = false;
  isEdit = false;
  editingIndex: number = -1;

  constructor(private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      type: ['Notice', Validators.required]
    });
  }

  openModal(activity?: Activity, index?: number) {
    this.showModal = true;
    this.isEdit = !!activity;

    if (activity) {
      this.editingIndex = index!;
      this.activityForm.patchValue(activity);
    } else {
      this.editingIndex = -1;
      this.activityForm.reset({ type: 'Notice' });
    }
  }

  closeModal() {
    this.showModal = false;
    this.activityForm.reset();
    this.editingIndex = -1;
  }

  saveActivity() {
    if (this.activityForm.invalid) return;

    const formValue = this.activityForm.value;

    if (this.isEdit && this.editingIndex !== -1) {
      this.activities[this.editingIndex] = formValue;
    } else {
      this.activities.push(formValue);
    }

    this.closeModal();
  }

  deleteActivity(index: number) {
    const confirmDelete = confirm('Are you sure you want to delete this activity?');
    if (confirmDelete) {
      this.activities.splice(index, 1);
    }
  }
}
