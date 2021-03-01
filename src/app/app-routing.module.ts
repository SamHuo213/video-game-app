import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGameDetailComponent } from './modules/video-game-details/video-game-detail.component';
import { VideoGameListComponent } from './modules/video-game-list/video-game-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'video-game-list',
    pathMatch: 'full'
  },
  {
    path: 'video-game-list',
    component: VideoGameListComponent,
    pathMatch: 'full'
  },
  {
    path: 'video-game/:videoGameId',
    component: VideoGameDetailComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
