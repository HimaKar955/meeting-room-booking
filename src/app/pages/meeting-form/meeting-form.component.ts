import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent {
  rooms = Array.from({ length: 10 }, (_, i) => `Room ${i + 1}`);
}
