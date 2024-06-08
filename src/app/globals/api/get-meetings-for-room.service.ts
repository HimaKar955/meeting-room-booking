import { Injectable } from '@angular/core';
import { AddMeetingService } from './add-meeting.service';

@Injectable({
  providedIn: 'root'
})
export class GetMeetingsForRoomService {
  constructor(private addMeetingService: AddMeetingService) {}

  getMeetingsForRoom(room: string): any[] {
    const meetings = this.addMeetingService.getMeetingsSubject().getValue();
    return meetings.filter(meeting => meeting.room === room);
  }
}
