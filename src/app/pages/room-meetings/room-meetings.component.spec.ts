import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMeetingsComponent } from './room-meetings.component';

describe('RoomMeetingsComponent', () => {
  let component: RoomMeetingsComponent;
  let fixture: ComponentFixture<RoomMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RoomMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
