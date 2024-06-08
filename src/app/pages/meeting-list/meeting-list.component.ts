import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/globals/services/api.service';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  meetings: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  onDelete(id: number): void {
    this.apiService.deleteMeeting(id);
  }
}
