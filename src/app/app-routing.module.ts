import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingFormComponent } from './pages/meeting-form/meeting-form.component';
import { MeetingListComponent } from './pages/meeting-list/meeting-list.component';
import { RoomStatusComponent } from './pages/room-status/room-status.component';

const routes: Routes = [
  { path: '', redirectTo: '/meeting-form', pathMatch: 'full' },
  { path: 'meeting-form', component: MeetingFormComponent },
  { path: 'meeting-list', component: MeetingListComponent },
  { path: 'room-status', component: RoomStatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
