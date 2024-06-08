import { Injectable } from '@angular/core';
import { AddMeetingService } from './add-meeting.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteMeetingService {
  constructor(private addMeetingService: AddMeetingService) {}

  deleteMeeting(id: number): void {
    let meetings = this.addMeetingService.getMeetingsSubject().getValue();
    meetings = meetings.filter(meeting => meeting.id !== id);
    localStorage.setItem('meetings', JSON.stringify(meetings));
    this.addMeetingService.getMeetingsSubject().next(meetings);
  }
}
