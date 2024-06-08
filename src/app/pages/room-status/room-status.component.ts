import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.css']
})
export class RoomStatusComponent {
  statuses = [
    { room: 'Room 1', status: 'Available' }
    // Add more statuses as needed for initial setup
  ];
}
