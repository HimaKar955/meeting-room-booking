import { Injectable } from '@angular/core';
import { AddMeetingService } from './add-meeting.service';

@Injectable({
  providedIn: 'root'
})
export class GetUserForMeetingService {
  constructor(private addMeetingService: AddMeetingService) {}

  getUserForMeeting(room: string, date: string, from: string, to: string): string {
    const meetings = this.addMeetingService.getMeetingsForDate(date).filter(meeting => {
      return meeting.room === room && meeting.from <= to && meeting.to >= from;
    });
    if (meetings.length > 0) {
      return meetings[0].username;
    }
    return '';
  }
}
