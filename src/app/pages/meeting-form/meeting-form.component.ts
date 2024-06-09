import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddMeetingService, Meeting } from 'src/app/globals/api/add-meeting.service';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {
  meetingForm: FormGroup = new FormGroup({}); // Initialize meetingForm
  rooms: string[] = [];
  availableRooms: string[] = [];

  constructor(private fb: FormBuilder, private addMeetingService: AddMeetingService) {
    this.meetingForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.rooms = Array.from({ length: 10 }, (_, i) => `Room ${i + 1}`);
    this.meetingForm = this.fb.group({
      username: ['', Validators.required],
      room: ['', Validators.required],
      date: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      agenda: ['']
    });

    this.meetingForm.get('date')?.valueChanges.subscribe(date => {
      this.checkRoomAvailability();
    });

    this.meetingForm.get('from')?.valueChanges.subscribe(() => {
      this.checkRoomAvailability();
    });

    this.meetingForm.get('to')?.valueChanges.subscribe(() => {
      this.checkRoomAvailability();
    });
  }

  private checkRoomAvailability(): void {
    const date = this.meetingForm.get('date')?.value;
    const from = this.meetingForm.get('from')?.value;
    const to = this.meetingForm.get('to')?.value;

    if (!date || !from || !to) {
      this.availableRooms = [...this.rooms];
      return;
    }

    const meetings = this.addMeetingService.getMeetingsForDate(date);
    this.availableRooms = this.rooms.filter(room => 
      !meetings.some(meeting => 
        meeting.room === room && 
        ((meeting.from <= to && meeting.to >= from))
      )
    );
  }

  private isValidTimeRange(): boolean {
    const from = this.meetingForm.get('from')?.value;
    const to = this.meetingForm.get('to')?.value;
    if (!from || !to) return false;

    const fromTime = new Date(`1970-01-01T${from}:00`);
    const toTime = new Date(`1970-01-01T${to}:00`);
    const startTime = new Date(`1970-01-01T09:00:00`);
    const endTime = new Date(`1970-01-01T18:00:00`);
    const minDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
    return (
      fromTime >= startTime &&
      toTime <= endTime &&
      toTime.getTime() - fromTime.getTime() >= minDuration
    );
  }

  private isWeekday(date: string): boolean {
    const day = new Date(date).getDay();
    return day >= 1 && day <= 5; // Monday to Friday
  }

  onSubmit(): void {
    // Mark all form controls as touched
    Object.values(this.meetingForm.controls).forEach(control => {
      control.markAsTouched();
    });

    const { room, date, from, to } = this.meetingForm.value;
    if (this.meetingForm.valid && this.isValidTimeRange() && this.isWeekday(date)) {
      if (this.availableRooms.includes(room)) {
        const meeting: Meeting = {
          id: Date.now(),
          ...this.meetingForm.value
        };
        this.addMeetingService.addMeeting(meeting);
        this.meetingForm.reset(); // Optionally, reset form fields
        alert('Meeting booked successfully');
      } else {
        alert('The selected room is not available at the chosen time. Please choose a different time or room.');
      }
    } else {
      alert('Please ensure the meeting is scheduled on a weekday, within the hours of 9:00 AM to 6:00 PM, and for a minimum duration of 30 minutes.');
    }
  }
}
