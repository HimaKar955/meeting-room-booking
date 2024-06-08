import { Injectable } from '@angular/core';
import { GetMeetingsForRoomService } from './get-meetings-for-room.service';

@Injectable({
  providedIn: 'root'
})
export class GetRoomStatusService {
  constructor(private getMeetingsForRoomService: GetMeetingsForRoomService) {}

  getRoomStatus(date: string, from: string, to: string): { room: string, status: string }[] {
    const rooms = Array.from({ length: 10 }, (_, i) => `Room ${i + 1}`);
    return rooms.map(room => {
      const meetings = this.getMeetingsForRoomService.getMeetingsForRoom(room);
      const inUse = meetings.some(meeting =>
        meeting.date === date &&
        ((meeting.from <= from && meeting.to > from) || (meeting.from < to && meeting.to >= to))
      );
      return { room, status: inUse ? 'In-Use' : 'Available' };
    });
  }
}
