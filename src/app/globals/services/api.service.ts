import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMeetingService } from '../api/add-meeting.service';
import { GetMeetingsService } from '../api/get-meetings.service';
import { DeleteMeetingService } from '../api/delete-meeting.service';
import { GetMeetingsForRoomService } from '../api/get-meetings-for-room.service';
import { GetRoomStatusService } from '../api/get-room-status.service';
import { GetUserForMeetingService } from '../api/get-user-for-meeting.service';

interface Meeting {
  id: number;
  username: string;
  room: string;
  date: string;
  from: string;
  to: string;
  agenda: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private addMeetingService: AddMeetingService,
    private getMeetingsService: GetMeetingsService,
    private deleteMeetingService: DeleteMeetingService,
    private getMeetingsForRoomService: GetMeetingsForRoomService,
    private getRoomStatusService: GetRoomStatusService,
    private getUserForMeetingService: GetUserForMeetingService
  ) {}

  getMeetings(): Observable<Meeting[]> {
    return this.getMeetingsService.getMeetings();
  }

  addMeeting(meeting: Meeting): void {
    this.addMeetingService.addMeeting(meeting);
  }

  deleteMeeting(id: number): void {
    this.deleteMeetingService.deleteMeeting(id);
  }

  getMeetingsForRoom(room: string): Meeting[] {
    return this.getMeetingsForRoomService.getMeetingsForRoom(room);
  }

  getRoomStatus(date: string, from: string, to: string): { room: string, status: string }[] {
    return this.getRoomStatusService.getRoomStatus(date, from, to);
  }

  getUserForMeeting(room: string, date: string, from: string, to: string): string {
    return this.getUserForMeetingService.getUserForMeeting(room, date, from, to);
  }
}
