import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { VideoGameDto } from 'src/app/models/video-game-dto';
import { VideoGameService } from 'src/app/services/video-game/video-game.service';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'video-game-detail',
  templateUrl: './video-game-detail.component.html',
  styleUrls: ['./video-game-detail.component.scss']
})
export class VideoGameDetailComponent implements OnInit {
  videoGameForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private videoGameService: VideoGameService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.videoGameForm = this.formBuilder.group({
      id: [undefined],
      name: [''],
      genre: [''],
      difficulty: [undefined],
      rating: [undefined]
    });
  }

  ngOnInit() {
    this.activatedRoute
      .paramMap
      .pipe(mergeMap(this.onParamMapMerge.bind(this)))
      .pipe(take(1))
      .subscribe(this.onGetVideoGame.bind(this));
  }

  onParamMapMerge(params: ParamMap) {
    const videoGameIdString = params.get('videoGameId');
    if (!videoGameIdString) {
      return of(null);
    }

    const videoGameId = parseInt(videoGameIdString);
    return this.videoGameService.getVideoGameDetail(videoGameId);
  }

  onGetVideoGame(videoGame: VideoGameDto | null | undefined) {
    if (!videoGame) {
      return;
    }

    this.buildForm(videoGame);
  }

  buildForm(videoGame: VideoGameDto) {
    this.videoGameForm = this.formBuilder.group({
      id: [videoGame.id],
      name: [videoGame.name, [Validators.required]],
      genre: [videoGame.genre, [Validators.required]],
      difficulty: [videoGame.difficulty, [Validators.required]],
      rating: [videoGame.rating, [Validators.required]]
    });
  }

  onCancel() {
    this.router.navigateByUrl('video-game-list');
  }

  onSave() {
    if (this.videoGameForm.invalid) {
      this.showErrorNotification();
      return;
    }

    this.videoGameService.saveVideoGame(this.convertToVideoGameDto(this.videoGameForm))
      .pipe(take(1))
      .subscribe(() => {
        this.showSuccessNotification();
        this.router.navigateByUrl('video-game-list');
      });
  }

  convertToVideoGameDto(videoGameForm: FormGroup) {
    const controls = videoGameForm.controls;
    return {
      id: controls.id.value,
      name: controls.name.value,
      genre: controls.genre.value,
      difficulty: controls.difficulty.value,
      rating: controls.rating.value,
    };
  }

  showErrorNotification() {
    this.notificationService.show({
      content: 'Form Error',
      cssClass: 'error_notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'error', icon: true },
      closable: true
    });
  }

  showSuccessNotification() {
    this.notificationService.show({
      content: 'Saved Video Game',
      cssClass: 'success-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'success', icon: true },
      closable: true
    });
  }
}
