import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/globals/services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meeting } from 'src/app/globals/api/add-meeting.service';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {
  meetingForm: FormGroup = new FormGroup({}); // Initialize meetingForm

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      username: ['', Validators.required],
      room: ['', Validators.required],
      date: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      agenda: [''] // Agenda is optional
    });
  }

  onSubmit(): void {
    // Mark all form controls as touched
    Object.values(this.meetingForm.controls).forEach(control => {
      control.markAsTouched();
    });
  
    if (this.meetingForm.valid) {
      const meeting: Meeting = {
        id: 0, // Assign a default value for id, it will be overwritten when added to the API
        ...this.meetingForm.value
      };
      console.log(meeting);
      this.apiService.addMeeting(meeting);
      this.meetingForm.reset(); // Optionally, reset form fields
    }
  }
  
}