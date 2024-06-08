import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
export class AddMeetingService {
  private localStorageKey = 'meetings';
  private meetings: Meeting[] = this.loadMeetings();
  private meetingsSubject: BehaviorSubject<Meeting[]> = new BehaviorSubject(this.meetings);

  private loadMeetings(): Meeting[] {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      return JSON.parse(data);
    } else {
      // Generate random data if no meetings are available
      const randomMeetings: Meeting[] = [];
      const roomNames = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'];
      const usernames = ['John Doe', 'Alice Smith', 'Bob Johnson', 'Emily Brown', 'Michael Davis'];
  
      const currentDate = new Date();
      const currentDateStr = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  
      for (let i = 0; i < 5; i++) {
        const randomRoomIndex = Math.floor(Math.random() * roomNames.length);
        const randomUserIndex = Math.floor(Math.random() * usernames.length);
  
        const randomMeeting: Meeting = {
          id: i + 1,
          username: usernames[randomUserIndex],
          room: roomNames[randomRoomIndex],
          date: currentDateStr,
          from: '09:00',
          to: '10:00',
          agenda: 'Random agenda'
        };
  
        randomMeetings.push(randomMeeting);
      }
  
      localStorage.setItem(this.localStorageKey, JSON.stringify(randomMeetings));
      return randomMeetings;
    }
  }
  

  private saveMeetings(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.meetings));
  }

  addMeeting(meeting: Meeting): void {
    this.meetings.push({ ...meeting, id: Date.now() });
    this.saveMeetings();
    this.meetingsSubject.next(this.meetings);
  }

  getMeetingsSubject(): BehaviorSubject<Meeting[]> {
    return this.meetingsSubject;
  }
}
