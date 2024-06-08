import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMeetingService } from './add-meeting.service';

@Injectable({
  providedIn: 'root'
})
export class GetMeetingsService {
  constructor(private addMeetingService: AddMeetingService) {}

  getMeetings(): Observable<any[]> {
    return this.addMeetingService.getMeetingsSubject().asObservable();
  }
}
