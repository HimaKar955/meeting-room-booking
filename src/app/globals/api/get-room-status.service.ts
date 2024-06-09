import { Injectable } from '@angular/core';
import { AddMeetingService } from './add-meeting.service';

@Injectable({
  providedIn: 'root'
})
export class GetRoomStatusService {
  constructor(private addMeetingService: AddMeetingService) {}

  getRoomStatus(date: string, from: string, to: string): { room: string, status: string }[] {
    const rooms = Array.from({ length: 10 }, (_, i) => `Room ${i + 1}`);
    return rooms.map(room => {
      const meetings = this.addMeetingService.getMeetingsForDate(date).filter(meeting => meeting.room === room);
      const inUse = meetings.some(meeting =>
        (meeting.from < to && meeting.to > from) // Check if times overlap
      );
      return { room, status: inUse ? 'In-Use' : 'Available' };
    });
  }
}
