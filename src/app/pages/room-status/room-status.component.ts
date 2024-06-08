import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/globals/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.css']
})
export class RoomStatusComponent {
  date: string = '';
  from: string = '';
  to: string = '';
  roomStatus: { room: string, status: string }[] = [];

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.roomStatus = this.apiService.getRoomStatus(this.date, this.from, this.to);
  }
}
