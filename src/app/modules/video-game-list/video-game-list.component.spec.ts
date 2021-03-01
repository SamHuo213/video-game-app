import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { VideoGameService } from 'src/app/services/video-game/video-game.service';
import { VideoGameListComponent } from './video-game-list.component';

describe('VideoGameListComponent', () => {
	let component: VideoGameListComponent;
	let fixture: ComponentFixture<VideoGameListComponent>;

	let routerService = {
		navigateByUrl: jasmine.createSpy().and.callFake(() => { })
	};

	let videoGameService = {
		getVideoGameList: jasmine.createSpy().and.callFake(() => of([]))
	};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [VideoGameListComponent],
			imports: [],
			providers: [{
				provide: Router,
				useValue: routerService
			}, {
				provide: VideoGameService,
				useValue: videoGameService
			}],
			schemas: [NO_ERRORS_SCHEMA]
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VideoGameListComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('getVideoGameList', () => {
		it('should call getVideoGameList', () => {
			videoGameService.getVideoGameList = jasmine.createSpy().and.callFake(() => {
				return of([]);
			});

			component.getVideoGameList();

			expect(videoGameService.getVideoGameList).toHaveBeenCalled();
		});
	});

	describe('getVideoGameList', () => {
		it('should set videoGameList', () => {
			const videoGameList = [{
				id: 1,
				name: 'Starcraft BroodWar',
				genre: 'Real-time',
				difficulty: 5,
				rating: 5
			}];

			component.onGetVideoGameList(videoGameList);

			expect(component.videoGameList).toContain({
				id: 1,
				name: 'Starcraft BroodWar',
				genre: 'Real-time',
				difficulty: 5,
				rating: 5
			});
		});
	});

	describe('onVideoGameClick', () => {
		it('should call navigateByUrl', waitForAsync(() => {
			component.onVideoGameClick(5);

			expect(routerService.navigateByUrl).toHaveBeenCalledWith('video-game/5');
		}));
	});
});