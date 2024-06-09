import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meeting } from 'src/app/globals/api/add-meeting.service';
import { ApiService } from 'src/app/globals/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-meetings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-meetings.component.html',
  styleUrls: ['./room-meetings.component.css']
})
export class RoomMeetingsComponent implements OnInit {
  selectedRoom: string = '';
  meetings: Meeting[] = [];
  rooms: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.rooms = Array.from({ length: 10 }, (_, i) => `Room ${i + 1}`);
  }

  loadMeetingsForRoom(room: string): void {
    this.selectedRoom = room;
    this.meetings = this.apiService.getMeetingsForRoom(room);
  }
}
