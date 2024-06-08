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
    return data ? JSON.parse(data) : [];
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
