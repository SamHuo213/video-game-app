import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoGameService } from 'src/app/services/video-game/video-game.service';
import { take } from 'rxjs/operators';
import { VideoGameDto } from 'src/app/models/video-game-dto';

@Component({
  selector: 'video-game-list',
  templateUrl: './video-game-list.component.html',
  styleUrls: ['./video-game-list.component.scss']
})
export class VideoGameListComponent implements OnInit {
  videoGameList: VideoGameDto[] = [];

  constructor(
    private router: Router,
    private videoGameService: VideoGameService
  ) { }

  ngOnInit() {
    this.getVideoGameList();
  }

  getVideoGameList() {
    this.videoGameService.getVideoGameList()
      .pipe(take(1))
      .subscribe(this.onGetVideoGameList.bind(this));
  }

  onGetVideoGameList(videoGames: VideoGameDto[]) {
    this.videoGameList = videoGames;
  }

  onVideoGameClick(videoGameId: number) {
    this.router.navigateByUrl(`video-game/${videoGameId}`);
  }
}
