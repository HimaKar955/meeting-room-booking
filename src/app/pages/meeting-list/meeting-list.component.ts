import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent {
  meetings = [
    { id: 1, username: 'John', room: 'Room 1', date: '2023-06-08', from: '10:00', to: '11:00', agenda: 'Project Meeting' }
    // Add more meetings as needed for initial setup
  ];
}
